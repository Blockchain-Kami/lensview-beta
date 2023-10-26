import { Request, Response, NextFunction } from "express";
import { RelatedPublicationsRequestQueryModel } from "../../models/request-queries/related-publications.request-query.model";
import { ClientError } from "../../errors/client-error.error";

/**
 * Validate the requests query parameter 'search_query'.
 *
 * @param {Request<unknown, unknown, unknown, RelatedPublicationsRequestQueryModel>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @throws {Error} Throws an error if the request query parameter 'search_query' is not present.
 */
export const validateRelatedRouteRequestMiddleware = (
  req: Request<unknown, unknown, unknown, RelatedPublicationsRequestQueryModel>,
  res: Response,
  next: NextFunction
) => {
  if (req.query && req.query.search_query) {
    return next();
  } else {
    throw new ClientError(
      "Check the request query parameter: search_query",
      400
    );
  }
};
