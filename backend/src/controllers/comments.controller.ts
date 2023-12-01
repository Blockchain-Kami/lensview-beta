import { Request, Response } from "express";
import { isInputTypeURLUtil } from "../utils/helpers/is-input-url.helpers.util";
import { httpStatusCodes } from "../config/app-constants.config";
import { getRelatedPublicationsService } from "../services/lens/related-parent-publications.lens.service";
import postOnChainPublicationUtil from "../utils/publications/post-onchain.publication.util";
import { preprocessURLAndCreateMetadataObject } from "../utils/helpers/preprocess-url-and-create-metadata-object.helpers.util";
import { putAnonymousCommentRequestBodyModel } from "../models/request-bodies/anonymous-comment.request-body.model";
import commentOnChainPublicationUtil from "../utils/publications/comment-onchain.publication.util";
import { InternalServerError } from "../errors/internal-server-error.error";
import { putAnonymousCommentResponseModel } from "../models/response-bodies/comment-anonymously.response-body.model.util";

/**
 * Adds a URL or a post comment to the system.
 *
 * @param {Request} req - The request object containing user input.
 * @param {Response} res - The response object to send back to the client.
 * @return {Promise<void>} A Promise that resolves when the URL or post comment is successfully added.
 */
export const addUrlOrPostCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      userEnteredString,
      postContent,
      lensHandle,
      userTags: tags
    } = req.body;

    const urlString = isInputTypeURLUtil(userEnteredString);
    if (!urlString) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        isURL: false,
        message: "User entered a tag"
      });
    }

    const urlObj = preprocessURLAndCreateMetadataObject(
      urlString,
      lensHandle,
      postContent,
      tags
    );
    const publicationExists = await getRelatedPublicationsService([
      urlObj.hashedURL
    ]);

    if (publicationExists && publicationExists.items.length > 0) {
      console.log(JSON.stringify(publicationExists));
      return res.status(httpStatusCodes.OK).send({
        message: "Publication Found"
      });
    } else {
      const trxHash = await postOnChainPublicationUtil(urlObj);
      res.status(200).send({
        url: urlObj.url,
        tags,
        trxHash
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Failed to ADD URL OR POST COMMENT to LensView"
    });
  }
};

/**
 * Handles the request to add an anonymous comment to a publication.
 *
 * @param {Request<unknown, unknown, putAnonymousCommentRequestBodyModel>} req - The request object containing the body with the publication ID and comment content.
 * @param {Response<putAnonymousCommentResponseModel>} res - The response object used to send the success message and status code.
 * @return {Promise<void>} - A promise that resolves when the comment has been successfully added.
 */
export const putAnonymousCommentController = async (
  req: Request<unknown, unknown, putAnonymousCommentRequestBodyModel>,
  res: Response<putAnonymousCommentResponseModel>
) => {
  try {
    const { pubId, content } = req.body;
    await commentOnChainPublicationUtil(pubId, content);
    res.status(httpStatusCodes.CREATED).send({
      pubId,
      message: "Comment added successfully"
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError(
      "Failed to add anonymous comment to LensView: " + error,
      500,
      "Internal Server Error"
    );
  }
};
