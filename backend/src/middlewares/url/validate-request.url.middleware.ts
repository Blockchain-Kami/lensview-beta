import { Request, Response, NextFunction } from "express";
import { ClientError } from "../../errors/client-error.error";
import { httpStatusCodes } from "../../config/app-constants.config";
import PostNewPublicationBodyRequestModel from "../../models/requests/body/post-new-publication.body.request.model";

/**
 * Validates the request body for the URLNewPubRouteMiddleware.
 *
 * @param {Request<unknown, unknown, PostNewPublicationBodyRequestModel, unknown>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @return {void}
 */
export const validatePostNewPublicationController = (
  req: Request<unknown, unknown, PostNewPublicationBodyRequestModel, unknown>,
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
