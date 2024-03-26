import { Request, Response, NextFunction } from "express";
import { ClientError } from "../../errors/client-error.error";
import PostNewPublicationBodyRequestModel from "../../models/requests/body/post-new-publication.body.request.model";
import { logger } from "../../log/log-manager.log";
import { httpStatusCodes } from "../../config/app-constants.config";

/**
 * Validates the request body for the URLNewPubRouteMiddleware.
 *
 * @param {Request<unknown, unknown, PostNewPublicationBodyRequestModel, unknown>} req - The request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {void}
 */
export const validatePostNewPublicationMiddleware = (
  req: Request<unknown, unknown, PostNewPublicationBodyRequestModel, unknown>,
  _res: Response,
  next: NextFunction
) => {
  logger.info(
    "validate-request.url.middleware.ts: validatePostNewPublicationMiddleware: Execution Started."
  );
  logger.info(
    "validate-request.url.middleware.ts: validatePostNewPublicationController: request body: " +
      JSON.stringify(req.body)
  );
  if (
    req.path === "/new-pub" &&
    req.body &&
    req.body.url &&
    req.body.lensHandle
  ) {
    logger.info(
      "validate-request.url.middleware.ts: validatePostNewPublicationController: request body is valid"
    );
    return next();
  } else {
    logger.error(
      "validate-request.url.middleware.ts: validatePostNewPublicationController: request body is invalid"
    );
    throw new ClientError(
      "Check the request body: 'url' and 'lensHandle' must be supplied",
      httpStatusCodes.BAD_REQUEST
    );
  }
};
