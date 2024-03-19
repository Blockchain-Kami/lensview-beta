import { Request, Response, NextFunction } from "express";
import { SearchQueryRequestModel } from "../models/requests/query/search.query.request.model";
import { ClientError } from "../errors/client-error.error";
import { logger } from "../log/log-manager.log";

/**
 * Validate the requests query parameter 'search_query'.
 *
 * @param {Request<unknown, unknown, unknown, SearchQueryRequestModel>} req - The request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next function.
 * @throws {Error} Throws an error if the request query parameter 'search_query' is not present.
 */
export const validateRequestQueryParametersMiddleware = (
  req: Request<unknown, unknown, unknown, SearchQueryRequestModel>,
  _res: Response,
  next: NextFunction
) => {
  logger.info(
    "validate-request-query-parameters.middleware.ts: validateRequestQueryParametersMiddleware: Execution Started."
  );
  logger.info(
    "validate-request-query-parameters.middleware.ts: validateRequestQueryParametersMiddleware: request query: " +
      JSON.stringify(req.query)
  );
  if (req.query && req.query.search_query) {
    logger.info(
      "validate-request-query-parameters.middleware.ts: validateRequestQueryParametersMiddleware: request query is valid"
    );
    return next();
  } else {
    logger.error(
      "validate-request-query-parameters.middleware.ts: validateRequestQueryParametersMiddleware: request query is invalid"
    );
    throw new ClientError(
      "Check the request query parameter: search_query",
      400
    );
  }
};
