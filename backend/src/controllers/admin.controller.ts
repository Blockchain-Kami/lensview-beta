import { Request, Response } from "express";
import { preprocessURLAndCreateMetadataObjectHelperUtil } from "../utils/helpers/preprocess-url-and-create-metadata-object.helper.util";
import { APP_LENS_HANDLE } from "../config/env.config";
import AddImageToPostAdminRouteBodyRequestModel from "../models/requests/body/admin-route.body.request.model";
import { getRelatedPublicationsService } from "../services/lens/related-parent-publications.lens.service";
import { httpStatusCodes } from "../config/app-constants.config";
import { PublicationResponseModel } from "../models/response/publication.response.model";
import { uploadScreenshotAndCommentWithImageJobUtil } from "../utils/jobs/upload-screenshot-and-comment-with-image.job.util";
import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util";

/**
 * Adds an image to a post in the admin controller.
 *
 * @param {Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>} req - The HTTP request object.
 * @param {Response<PublicationResponseModel>} res - The HTTP response object.
 * @return {Promise<void>} A promise that resolves to nothing.
 */
export const addImageToPostAdminController = async (
  req: Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>,
  res: Response<PublicationResponseModel>
) => {
  const { url } = req.body;
  const urlString = isInputTypeURLHelperUtil(url);
  const urlObj = preprocessURLAndCreateMetadataObjectHelperUtil(
    urlString ? urlString : url,
    APP_LENS_HANDLE,
    null,
    []
  );
  console.log(JSON.stringify(urlObj));
  const publicationExists = await getRelatedPublicationsService([
    urlObj.hashedURL
  ]);
  console.log(JSON.stringify(publicationExists));
  if (publicationExists && publicationExists.items.length > 0) {
    await uploadScreenshotAndCommentWithImageJobUtil(urlObj);
    return res.status(httpStatusCodes.CREATED).send({
      publicationID: publicationExists.items[0].id,
      message: "Image Added To Post"
    });
  } else {
    return res.status(httpStatusCodes.OK).send({
      publicationID: null,
      message: "Could Not Find Publication"
    });
  }
};
