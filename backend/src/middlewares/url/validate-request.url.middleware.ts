import { Request, Response, NextFunction } from "express";
import PublicationsRequestBodyModel from "../../models/request-bodies/publications-request-body.model";
import { ClientError } from "../../errors/client-error.error";
import { httpStatusCodes } from "../../config/app-constants.config";

/**
 * Validates the request body for the URLNewPubRouteMiddleware.
 *
 * @param {Request<unknown, unknown, PublicationsRequestBodyModel, unknown>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {void}
 */
export const URLNewPubRouteMiddleware = (
  req: Request<unknown, unknown, PublicationsRequestBodyModel, unknown>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.path);
  if (
    req.path === "/new-pub" &&
    req.body &&
    req.body.url &&
    req.body.lensHandle
  ) {
    return next();
  } else {
    throw new ClientError(
      "Check the request body: 'url' and 'lensHandle' must be supplied",
      httpStatusCodes.BAD_REQUEST
    );
  }
};
