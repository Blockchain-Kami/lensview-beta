import { Request, Response } from "express";
import { isInputTypeURLUtil } from "../utils/helpers/is-input-url.helpers.util";
import { httpStatusCodes } from "../config/app-constants.config";
import { preprocessURLAndCreateMetadataObject } from "../utils/helpers/preprocess-url-and-create-metadata-object.helpers.util";
import { getRelatedPublicationsService } from "../services/lens/related-parent-publications.lens.service";
import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";
import { LinkPublicationLensModel } from "../models/lens-models/link-publication.lens.model";
import { PublicationsResponseModel } from "../models/response-bodies/publications.response-body.model";
import { imageQueue } from "../jobs/add-image-queue.job";

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
