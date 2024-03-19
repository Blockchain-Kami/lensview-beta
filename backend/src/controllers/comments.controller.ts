import { Request, Response } from "express";
import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util";
import { httpStatusCodes } from "../config/app-constants.config";
import { relatedParentPublicationsLensService } from "../services/lens/related-parent-publications.lens.service";
import { preprocessURLAndCreateMetadataObjectHelperUtil } from "../utils/helpers/preprocess-url-and-create-metadata-object.helper.util";
import { putAnonymousCommentBodyRequestModel } from "../models/requests/body/put-anonymous-comment.body.request.model";
import {
  createMetaDataForAnonymousCommentHelperUtil,
  createMetaDataForUrlHelperUtil
} from "../utils/helpers/create-metadata.helper.util";
import { APP_LENS_HANDLE } from "../config/env.config";
import {
  PublicationResponseModel,
  PublicationResponseModelForPostAnonymousComment
} from "../models/response/publication.response.model";
import { imageQueue } from "../jobs/add-image-queue.job";
import { logger } from "../log/log-manager.log";
import PostAnonymousCommentRequestBodyModel from "../models/requests/body/post-anonymous-comment.body.request.model";
import { commentMomokaPublicationUtil } from "../utils/publications/comment-momoka.publication.util";
import { postMomokaPublicationUtil } from "../utils/publications/post-momoka.publication.util";
import { commentMomokaProfileManagerPublicationUtil } from "../utils/publications/comment-momoka-profile-manager.publication.util";
// import commentOnChainPublicationUtil from "../utils/publications/comment-onchain.publication.util";
// import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";

/**
 * Adds a URL or a post comment to the system.
 *
 * @param {Request} req - The request object containing user input.
 * @param {Response} res - The response object to send back to the client.
 * @return {Promise<void>} A Promise that resolves when the URL or post comment is successfully added.
 */
export const postAnonymousCommentController = async (
  req: Request<unknown, unknown, PostAnonymousCommentRequestBodyModel>,
  res: Response<PublicationResponseModelForPostAnonymousComment>
) => {
  logger.info(
    "comments.controller.ts: postAnonymousCommentController: Execution Started"
  );
  try {
    const { url, content, userTags: tags } = req.body;
    const urlString = isInputTypeURLHelperUtil(url);
    if (!urlString) {
      logger.warn(
        "comments.controller.ts: postAnonymousCommentController: Execution End. User entered a tag: " +
          urlString
      );
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        publicationID: null,
        alreadyExists: false,
        message: "User entered a tag"
      });
    }

    const urlObj = preprocessURLAndCreateMetadataObjectHelperUtil(
      urlString,
      APP_LENS_HANDLE,
      content,
      tags ? tags : []
    );
    const publicationExists = await relatedParentPublicationsLensService([
      urlObj.hashedURL
    ]);

    if (publicationExists && publicationExists.items.length > 0) {
      const publicationId = publicationExists.items[0]?.id;
      logger.info(
        "comments.controller.ts: postAnonymousCommentController: Publication already exists: Publication ID: " +
          publicationId
      );
      const commentMetadata = createMetaDataForAnonymousCommentHelperUtil(
        content,
        urlObj.url,
        "empty",
        false
      );
      await commentMomokaPublicationUtil(publicationId, commentMetadata);
      logger.info(
        "comments.controller.ts: postAnonymousCommentController: Execution Ended. Publication Found and Anonymous Comment Added: Publication ID: " +
          publicationId
      );
      return res.status(httpStatusCodes.CREATED).send({
        publicationID: publicationId,
        alreadyExists: true,
        message: "Publication Found and Anonymous Comment Added"
      });
    } else {
      logger.info(
        "comments.controller.ts: postAnonymousCommentController: Publication Not Found. Adding URL to LensView."
      );
      const postMetadata = createMetaDataForUrlHelperUtil(urlObj);
      await postMomokaPublicationUtil(postMetadata);
      imageQueue.add({ urlObj });
      const addedPublication = await relatedParentPublicationsLensService([
        urlObj.hashedURL
      ]);
      if (addedPublication && addedPublication.items.length > 0) {
        const newPublicationId = addedPublication.items[0]?.id;
        logger.info(
          "comments.controller.ts: postAnonymousCommentController: Publication added and indexed on-chain: " +
            newPublicationId
        );
        // TODO: Can put a default image URL for mainPostImageUrl
        const commentMetadata = createMetaDataForAnonymousCommentHelperUtil(
          content,
          urlObj.url,
          "empty",
          false
        );
        await commentMomokaPublicationUtil(newPublicationId, commentMetadata);
        logger.info(
          "comments.controller.ts: postAnonymousCommentController: Execution Ended. Publication and Anonymous Comment Added: Publication ID: " +
            newPublicationId
        );
        return res.status(httpStatusCodes.CREATED).send({
          publicationID: addedPublication.items[0]?.id,
          alreadyExists: false,
          message: "Publication and Anonymous Comment Added"
        });
      } else {
        logger.error(
          "comments.controller.ts: postAnonymousCommentController: Server Timeout: Failed to add URL OR POST COMMENT to LensView"
        );
        return res.status(httpStatusCodes.SERVER_TIMEOUT).send({
          publicationID: null,
          alreadyExists: false,
          message: "Timeout while adding URL OR POST COMMENT to LensView"
        });
      }
    }
  } catch (e) {
    logger.error(
      "comments.controller.ts: postAnonymousCommentController: Error in Execution: Failed to add URL OR POST COMMENT to LensView"
    );
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationID: null,
      alreadyExists: false,
      message: "Failed to ADD URL OR POST COMMENT to LensView"
    });
  }
};

/**
 * Handles the request to add an anonymous comment to a publication.
 *
 * @param {Request<unknown, unknown, putAnonymousCommentBodyRequestModel>} req - The request object containing the body with the publication ID and comment content.
 * @param {Response<putAnonymousCommentResponseModel>} res - The response object used to send the success message and status code.
 * @return {Promise<void>} - A promise that resolves when the comment has been successfully added.
 */
export const putAnonymousCommentController = async (
  req: Request<unknown, unknown, putAnonymousCommentBodyRequestModel>,
  res: Response<PublicationResponseModel>
) => {
  try {
    logger.info(
      "comments.controller.ts: putAnonymousCommentController: Execution Started"
    );
    const { pubId, content, mainPostUrl, mainPostImageUrl, isThisComment } =
      req.body;
    const metadata = createMetaDataForAnonymousCommentHelperUtil(
      content,
      mainPostUrl,
      mainPostImageUrl,
      isThisComment
    );
    await commentMomokaProfileManagerPublicationUtil(pubId, metadata);
    logger.info(
      "comments.controller.ts: putAnonymousCommentController: Comment added to publication: " +
        pubId
    );
    logger.info(
      "comments.controller.ts: putAnonymousCommentController: Execution Ended"
    );
    res.status(httpStatusCodes.CREATED).send({
      publicationID: pubId,
      message: "Comment added successfully"
    });
  } catch (error) {
    logger.error(
      "comments.controller.ts: putAnonymousCommentController: Error in Execution: " +
        error
    );
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationID: req.body.pubId,
      message: "Failed to ADD ANONYMOUS COMMENT to LensView"
    });
  }
};
