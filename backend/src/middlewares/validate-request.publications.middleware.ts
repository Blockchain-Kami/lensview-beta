import { Request, Response, NextFunction } from "express";
import { RelatedPublicationsRequestQueryModel } from "../models/request-queries/related-publications.request-query.model";

export const validateRelatedRouteRequestMiddleware = (
  req: Request<unknown, unknown, unknown, RelatedPublicationsRequestQueryModel>,
  res: Response,
  next: NextFunction
) => {
  if (req.query && req.query.search_query) {
    return next();
  } else {
    throw new Error("Check the request query parameter: search_query");
  }
};
