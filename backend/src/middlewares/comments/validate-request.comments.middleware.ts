import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/client-error.error";
import { putAnonymousCommentBodyRequestModel } from "../../models/requests/body/put-anonymous-comment.body.request.model";
import PostAnonymousCommentRequestBodyModel from "../../models/requests/body/post-anonymous-comment.body.request.model";
import { logger } from "../../log/log-manager.log";

export const validatePostAnonymousCommentRequestMiddleware = (
  req: Request<unknown, unknown, PostAnonymousCommentRequestBodyModel>,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    "validate-request.comments.middleware.ts: validatePostAnonymousCommentRequestMiddleware: request body: " +
      JSON.stringify(req.body)
  );
  if (req.body && req.body.url && req.body.content) {
    logger.info(
      "validate-request.comments.middleware.ts: validatePostAnonymousCommentRequestMiddleware: request body is valid"
    );
    return next();
  } else {
    logger.error(
      "validate-request.comments.middleware.ts: validatePostAnonymousCommentRequestMiddleware: request body is invalid"
    );
    throw new ClientError(
      "Check the request body: 'url' and 'content' must be supplied",
      400
    );
  }
};

/**
 * Validates the request for an anonymous comment.
 *
 * @param {Request<unknown, unknown, putAnonymousCommentBodyRequestModel>} req - The request object containing the body.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @throws {ClientError} Throws a ClientError if the request body is invalid.
 */
export const validatePutAnonymousCommentRequestMiddleware = (
  req: Request<unknown, unknown, putAnonymousCommentBodyRequestModel>,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body &&
    req.body.pubId &&
    req.body.content &&
    req.body.mainPostImageUrl &&
    req.body.isThisComment !== undefined
  ) {
    return next();
  } else {
    throw new ClientError(
      "Check the request body: pubId, content, isThisComment and mainPostImageUrl must be supplied",
      400
    );
  }
};
