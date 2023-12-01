import { Request, Response } from "express";

import { PublicationsResponseModel } from "../models/response-bodies/publications.response-body.model";
import { PublicationsRequestQueryModel } from "../models/request-queries/publications-request-query.model";
import { isInputTypeURLUtil } from "../utils/helpers/is-input-url.helpers.util";
import { getPublicationsForUrlPublicationsUtil } from "../utils/publications/get-publications-for-url-publications.util";
import { getPublicationsForTagPublicationsUtil } from "../utils/publications/get-publications-for-tag.publications.util";
import { SUCCESS, httpStatusCodes } from "../config/app-constants.config";

/**
 * Retrieves related publications based on the given search query.
 *
 * @param {Request<unknown, unknown, unknown, PublicationsRequestQueryModel>} req - The request object.
 * @param {Response<PublicationsResponseModel>} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the related publications are retrieved.
 */
export const getRelatedPublicationsController = async (
  req: Request<unknown, unknown, unknown, PublicationsRequestQueryModel>,
  res: Response<PublicationsResponseModel>
) => {
  let response, isURL;
  try {
    const inputString = req.query.search_query;
    const URL = isInputTypeURLUtil(inputString);

    if (URL) {
      response = await getPublicationsForUrlPublicationsUtil(URL);
      isURL = true
    } else {
      response = await getPublicationsForTagPublicationsUtil(inputString);
      isURL = false;
    }
    if (
      response?.relatedPublications.length <= 0 &&
      response?.message == SUCCESS
    ) {
      res.status(httpStatusCodes.NO_CONTENT).send({
        isURL,
        publications: [],
        message: "No related publications found."
      });
    } else if (
      response?.relatedPublications.length > 0 &&
      response?.message == SUCCESS
    ) {
      return res.status(httpStatusCodes.OK).send({
        isURL,
        publications: response.relatedPublications,
        message: "Publication IDs fetched successfully."
      });
    } else {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
        isURL,
        publications: [],
        message: "Lens API might be down. Please try again later."
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      isURL: false,
      publications: [],
      message: "Something went wrong: " + error
    });
  }
};
