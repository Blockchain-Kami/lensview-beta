import { Request, Response } from "express";
import { PublicationsResponseModel } from "../models/response/publications.response.model";
import { SearchQueryRequestModel } from "../models/requests/query/search.query.request.model";
import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util";
import { getPublicationsForURLPublicationUtil } from "../utils/publications/get-publications-for-url-publication.util";
import { getPublicationsForTagPublicationUtil } from "../utils/publications/get-publications-for-tag.publication.util";
import { SUCCESS, httpStatusCodes } from "../config/app-constants.config";

/**
 * Retrieves related publications based on the given search query.
 *
 * @param {Request<unknown, unknown, unknown, SearchQueryRequestModel>} req - The request object.
 * @param {Response<PublicationsResponseModel>} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the related publications are retrieved.
 */
export const getRelatedPublicationsController = async (
  req: Request<unknown, unknown, unknown, SearchQueryRequestModel>,
  res: Response<PublicationsResponseModel>
) => {
  let response;
  try {
    const inputString = req.query.search_query;
    const URL = isInputTypeURLHelperUtil(inputString);

    if (URL) {
      response = await getPublicationsForURLPublicationUtil(URL);
    } else {
      response = await getPublicationsForTagPublicationUtil(inputString);
    }
    if (
      response?.relatedPublications.length <= 0 &&
      response?.message == SUCCESS
    ) {
      res.status(httpStatusCodes.NO_CONTENT).send({
        publicationIDs: [],
        message: "No related publications found."
      });
    } else if (
      response?.relatedPublications.length > 0 &&
      response?.message == SUCCESS
    ) {
      return res.status(httpStatusCodes.OK).send({
        publicationIDs: response.relatedPublications,
        message: "Publication IDs fetched successfully."
      });
    } else {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
        publicationIDs: [],
        message: "Lens API might be down. Please try again later."
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationIDs: [],
      message: "Something went wrong: " + error
    });
  }
};
