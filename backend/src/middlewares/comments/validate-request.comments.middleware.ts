import { NextFunction, Request, Response } from "express";
import { ClientError } from "../../errors/client-error.error";
import { putAnonymousCommentRequestBodyModel } from "../../models/request-bodies/anonymous-comment.request-body.model";

/**
 * Validates the request for an anonymous comment.
 *
 * @param {Request<unknown, unknown, putAnonymousCommentRequestBodyModel>} req - The request object containing the body.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @throws {ClientError} Throws a ClientError if the request body is invalid.
 */
export const validateAnonymousCommentRequestMiddleware = (
  req: Request<unknown, unknown, putAnonymousCommentRequestBodyModel>,
  res: Response,
  next: NextFunction
) => {
  if (req.body && req.body.pubId && req.body.content) {
    return next();
  } else {
    throw new ClientError(
      "Check the request body: pubId and content must be supplied",
      400
    );
  }
};
