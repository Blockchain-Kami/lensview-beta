import { Request, Response } from "express";
import { isInputTypeURLUtil } from "../utils/helpers/is-input-url.helpers.util";
import { httpStatusCodes } from "../config/app-constants.config";
import { preprocessURLAndCreateMetadataObject } from "../utils/helpers/preprocess-url-and-create-metadata-object.helpers.util";
import { getRelatedPublicationsService } from "../services/lens/related-parent-publications.lens.service";
import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";
import { LinkPublicationLensModel } from "../models/lens-models/link-publication.lens.model";
import { PublicationsResponseModel } from "../models/response-bodies/publications.response-body.model";
import { imageQueue } from "../jobs/add-image-queue.job";
import { PublicationsRequestQueryModel } from "../models/request-queries/publications-request-query.model";
import { UrlExistsValidationResponseBody } from "../models/response-bodies/url-exists-validation.response-body.model";
import { preprocessURLUtil } from "../utils/helpers/preprocess-url.helpers.util";
import { createHashUtil } from "../utils/helpers/create-hash.helpers.util";

/**
 * Handles the logic for posting a new publication.
 *
 * @param {Request} req - The request object.
 * @param {Response<PublicationsResponseModel>} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const postNewPublicationController = async (
  req: Request,
  res: Response<PublicationsResponseModel>
) => {
  try {
    const { url, lensHandle, userTags } = req.body;

    const urlString = isInputTypeURLUtil(url);
    if (!urlString) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        isURL: false,
        publications: [],
        message: "User entered a tag"
      });
    }

    const urlObj = preprocessURLAndCreateMetadataObject(
      urlString,
      lensHandle,
      "",
      userTags
    );

    const publicationExists = await getRelatedPublicationsService([
      urlObj.hashedURL
    ]);

    if (publicationExists && publicationExists.items.length > 0) {
      console.log(JSON.stringify(publicationExists));
      return res.status(httpStatusCodes.OK).send({
        isURL: true,
        publications: [
          publicationExists.items[0].id as LinkPublicationLensModel
        ],
        message: "Publication Already Exists"
      });
    } else {
      await postOnChainPublicationUtil(urlObj);
      imageQueue.add({ urlObj });
      const newPublication = await getRelatedPublicationsService([
        urlObj.hashedURL
      ]);

      if (newPublication && newPublication.items.length > 0) {
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          publications: [
            newPublication.items[0].id as LinkPublicationLensModel
          ],
          message: "Publication Added to LensView"
        });
      } else {
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          publications: [],
          message:
            "Timeout while waiting for Lens Protocol to add the publication"
        });
      }
    }
  } catch (e) {
    console.error(e);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      isURL: false,
      publications: [],
      message: "Internal Server Error while adding new URL"
    });
  }
};

/**
 * Validates if a URL exists and returns the corresponding publication.
 *
 * @param {Request<unknown, unknown, unknown, PublicationsRequestQueryModel>} req - The request object.
 * @param {Response<UrlExistsValidationResponseBody>} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export const urlExistsValidationController = async (
  req: Request<unknown, unknown, unknown, PublicationsRequestQueryModel>,
  res: Response<UrlExistsValidationResponseBody>
) => {
  try {
    const searchQuery = req.query.search_query;
    const isURL = isInputTypeURLUtil(searchQuery);
    if (isURL) {
      const [url, , , ,] = preprocessURLUtil(searchQuery);
      const hashedURL = createHashUtil(url);
      const publicationExists = await getRelatedPublicationsService([
        hashedURL
      ]);
      if (publicationExists && publicationExists.items.length > 0) {
        console.log(JSON.stringify(publicationExists));
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          pubId: publicationExists.items[0].id as LinkPublicationLensModel,
          message: "Publication Found"
        });
      } else {
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          pubId: null,
          message: "Publication Not Found"
        });
      }
    } else {
      res.status(httpStatusCodes.OK).send({
        isURL: false,
        pubId: null,
        message: "User entered a tag"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      isURL: false,
      pubId: null,
      message: "Internal Server Error: " + error
    });
  }
};
