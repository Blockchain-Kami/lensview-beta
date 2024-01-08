import { Request, Response } from "express";
import { PublicationResponseModelForNewPubURL } from "../models/response/publication.response.model";
import { SearchQueryRequestModel } from "../models/requests/query/search.query.request.model";
import { UrlExistsValidationResponseModel } from "../models/response/url-exists-validation.response.model";
import PostNewPublicationBodyRequestModel from "../models/requests/body/post-new-publication.body.request.model";
import { httpStatusCodes } from "../config/app-constants.config";
import { imageQueue } from "../jobs/add-image-queue.job";
import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util";
import { preprocessURLAndCreateMetadataObjectHelperUtil } from "../utils/helpers/preprocess-url-and-create-metadata-object.helper.util";
import { relatedParentPublicationsLensService } from "../services/lens/related-parent-publications.lens.service";
import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";
import { preprocessURLHelperUtil } from "../utils/helpers/preprocess-url.helper.util";
import { createHashHelperUtil } from "../utils/helpers/create-hash.helper.util";
import { createMetaDataForUrlHelperUtil } from "../utils/helpers/create-metadata.helper.util";
import {getMainPublicationImageLensService} from "../services/lens/get-main-publication-image.lens.service";

/**
 * Handles the logic for posting a new publication.
 *
 * @param {Request} req - The request object.
 * @param {Response<PublicationsResponseModel>} res - The response object.
 * @return {Promise<void>} - Returns a promise that resolves to void.
 */
export const postNewPublicationController = async (
  req: Request<unknown, unknown, PostNewPublicationBodyRequestModel>,
  res: Response<PublicationResponseModelForNewPubURL>
) => {
  try {
    const { url, lensHandle, userTags } = req.body;

    const urlString = isInputTypeURLHelperUtil(url);
    if (!urlString) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        publicationID: null,
        alreadyExists: false,
        mainPostImageUrl: null,
        message: "User entered a tag"
      });
    }

    const urlObj = preprocessURLAndCreateMetadataObjectHelperUtil(
      urlString,
      lensHandle,
      "",
      userTags ? userTags : []
    );

    const publicationExists = await relatedParentPublicationsLensService([
      urlObj.hashedURL
    ]);

    if (publicationExists && publicationExists.items.length > 0) {
      const publicationID = publicationExists.items[0].id;
      const publicationImageDetails = await getMainPublicationImageLensService(publicationID);
      return res.status(httpStatusCodes.OK).send({
        publicationID: publicationExists.items[0].id,
        alreadyExists: true,
        mainPostImageUrl: publicationImageDetails.items[0].metadata.rawURI,
        message: "Publication Already Exists"
      });
    } else {
      const postMetadata = createMetaDataForUrlHelperUtil(urlObj);
      await postOnChainPublicationUtil(postMetadata);
      imageQueue.add({ urlObj });
      const newPublication = await relatedParentPublicationsLensService([
        urlObj.hashedURL
      ]);

      if (newPublication && newPublication.items.length > 0) {
        const publicationID = newPublication.items[0].id;
        return res.status(httpStatusCodes.OK).send({
          publicationID: publicationID,
          alreadyExists: false,
          mainPostImageUrl: null,
          message: "Publication Added to LensView"
        });
      } else {
        return res.status(httpStatusCodes.OK).send({
          publicationID: null,
          alreadyExists: false,
          mainPostImageUrl: null,
          message:
            "Timeout while waiting for Lens Protocol to add the publication"
        });
      }
    }
  } catch (e) {
    console.error(e);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationID: null,
      alreadyExists: false,
      mainPostImageUrl: null,
      message: "Internal Server Error while adding new URL"
    });
  }
};

/**
 * Validates if a URL exists and returns the corresponding publication.
 *
 * @param {Request<unknown, unknown, unknown, SearchQueryRequestModel>} req - The request object.
 * @param {Response<UrlExistsValidationResponseModel>} res - The response object.
 * @return {Promise<void>} - Returns a Promise that resolves to void.
 */
export const urlExistsValidationController = async (
  req: Request<unknown, unknown, unknown, SearchQueryRequestModel>,
  res: Response<UrlExistsValidationResponseModel>
) => {
  try {
    const searchQuery = req.query.search_query;
    const isURL = isInputTypeURLHelperUtil(searchQuery);
    if (isURL) {
      const [url, , , ,] = preprocessURLHelperUtil(searchQuery);
      const hashedURL = createHashHelperUtil(url);
      const publicationExists = await relatedParentPublicationsLensService([
        hashedURL
      ]);
      if (publicationExists && publicationExists.items.length > 0) {
        console.log(JSON.stringify(publicationExists));
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          publicationID: publicationExists.items[0].id,
          message: "Publication Found"
        });
      } else {
        return res.status(httpStatusCodes.OK).send({
          isURL: true,
          publicationID: null,
          message: "Publication Not Found"
        });
      }
    } else {
      res.status(httpStatusCodes.OK).send({
        isURL: false,
        publicationID: null,
        message: "User entered a tag"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      isURL: false,
      publicationID: null,
      message: "Internal Server Error: " + error
    });
  }
};
