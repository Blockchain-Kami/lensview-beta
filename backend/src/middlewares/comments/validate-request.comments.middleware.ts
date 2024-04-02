import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/client-error.error";
import { putAnonymousCommentBodyRequestModel } from "../../models/requests/body/put-anonymous-comment.body.request.model";
import PostAnonymousCommentRequestBodyModel from "../../models/requests/body/post-anonymous-comment.body.request.model";
import { logger } from "../../log/log-manager.log";

/**
 * Middleware to validate the request body of a post anonymous comment request.
 *
 * @param {Request<unknown, unknown, PostAnonymousCommentRequestBodyModel>} req - The request object
 * @param {Response} _res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {void}
 */
export const validatePostAnonymousCommentRequestMiddleware = (
  req: Request<unknown, unknown, PostAnonymousCommentRequestBodyModel>,
  _res: Response,
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
  logger.info(
    "validate-request.comments.middleware.ts: validatePutAnonymousCommentRequestMiddleware: request body: " +
      JSON.stringify(req.body)
  );
  if (
    req.body &&
    req.body.pubId &&
    req.body.content &&
    req.body.mainPostUrl &&
    req.body.mainPostImageUrl &&
    req.body.isThisComment !== undefined
  ) {
    logger.info(
      "validate-request.comments.middleware.ts: validatePutAnonymousCommentRequestMiddleware: request body is valid"
    );
    return next();
  } else {
    logger.error(
      "validate-request.comments.middleware.ts: validatePostAnonymousCommentRequestMiddleware: request body is invalid"
    );
    throw new ClientError(
      "Check the request body: parameters(pubId, content, mainPostUrl, mainPostImageUrl and isThisComment) must be supplied",
      400
    );
  }
};
