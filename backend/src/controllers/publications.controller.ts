import { Request, Response } from "express";

import { PublicationsResponseModel } from "../models/response/publications.response.model.js";
import { SearchQueryRequestModel } from "../models/requests/query/search.query.request.model.js";

import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util.js";
import { getPublicationsForURLPublicationUtil } from "../utils/publications/get-publications-for-url-publication.util.js";
import { getPublicationsForTagPublicationUtil } from "../utils/publications/get-publications-for-tag.publication.util.js";

import { SUCCESS, httpStatusCodes } from "../config/app-constants.config.js";
import { logger } from "../log/log-manager.log.js";

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
  logger.info(
    "publications.controller.ts: getRelatedPublicationsController: Execution Started."
  );
  let response;
  try {
    const inputString = req.query.search_query;
    logger.info(
      "publications.controller.ts: getRelatedPublicationsController: request search query parameter: inputString: " +
        inputString
    );
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
      logger.info(
        "publications.controller.ts: getRelatedPublicationsController: Execution Ended. No related publications found."
      );
      res.status(httpStatusCodes.NO_CONTENT).send({
        publicationIDs: [],
        message: "No related publications found."
      });
    } else if (
      response?.relatedPublications.length > 0 &&
      response?.message == SUCCESS
    ) {
      logger.info(
        "publications.controller.ts: getRelatedPublicationsController: Execution Ended. Publication IDs fetched successfully: " +
          response.relatedPublications
      );
      return res.status(httpStatusCodes.OK).send({
        publicationIDs: response.relatedPublications,
        message: "Publication IDs fetched successfully."
      });
    } else {
      logger.info(
        "publications.controller.ts: getRelatedPublicationsController: Execution Ended. Error in fetching related publications."
      );
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
        publicationIDs: [],
        message: "Lens API might be down. Please try again later."
      });
    }
  } catch (error) {
    logger.error(
      "publications.controller.ts: getRelatedPublicationsController: Error in execution: " +
        error
    );
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationIDs: [],
      message: "Something went wrong: " + error
    });
  }
};
