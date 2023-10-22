import { Request, Response } from "express";

import { RelatedPublicationsResponseModel } from "../models/request-bodies/related-publications.response-body.model";
import { RelatedPublicationsRequestQueryModel } from "../models/request-queries/related-publications.request-query.model";
import { isInputTypeURLUtil } from "../utils/is-input-url.util";
import { getPublicationsForUrlPublicationsUtil } from "../utils/publications/get-publications-for-url-publications.util";
import { getPublicationsForTagPublicationsUtil } from "../utils/publications/get-publications-for-tag.publications.util";
import { SUCCESS, httpStatusCodes } from "../config/app-constants.config";

export const getRelatedPublicationsController = async (
  req: Request<unknown, unknown, unknown, RelatedPublicationsRequestQueryModel>,
  res: Response<RelatedPublicationsResponseModel>
) => {
  let response;
  try {
    const inputString = req.query.search_query;
    const URL = isInputTypeURLUtil(inputString);

    if (URL) {
      response = await getPublicationsForUrlPublicationsUtil(URL);
    } else {
      response = await getPublicationsForTagPublicationsUtil(inputString);
    }
    if (
      response?.relatedPublications.length <= 0 &&
      response?.message == SUCCESS
    ) {
      res.status(httpStatusCodes.NO_CONTENT).send({
        relatedPubArray: [],
        message: "No related publications found."
      });
    } else if (
      response?.relatedPublications.length > 0 &&
      response?.message == SUCCESS
    ) {
      return res.status(httpStatusCodes.OK).send({
        relatedPubArray: response.relatedPublications,
        message: "Publication IDs fetched successfully."
      });
    } else {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
        relatedPubArray: [],
        message: "Lens API might be down. Please try again later."
      });
    }
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      relatedPubArray: [],
      message: "Something went wrong with LensView server."
    });
  }
};
