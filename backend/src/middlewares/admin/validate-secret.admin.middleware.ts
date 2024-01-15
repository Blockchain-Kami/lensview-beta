import { Request, Response, NextFunction } from "express";
import AddImageToPostAdminRouteBodyRequestModel from "../../models/requests/body/admin-route.body.request.model";
import { createHashHelperUtil } from "../../utils/helpers/create-hash.helper.util";
import { ClientError } from "../../errors/client-error.error";

/**
 * Validates the secret key and URL in the request body and throws an error if they are invalid.
 *
 * @param {Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @throws {ClientError} If the secret key or URL is invalid.
 */
export const validateSecretAdminMiddleware = (
  req: Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>,
  res: Response,
  next: NextFunction
) => {
  const { secretKey, url } = req.body;
  if (url && secretKey) {
    if (
      createHashHelperUtil(secretKey) ===
      "5757c384c37f705ef28f68ed0e5932830c0a3393"
    )
      next();
    else {
      throw new ClientError(
        "Check the request body: incorrect secretKey supplied",
        400
      );
    }
  } else {
    throw new ClientError(
      "Check the request body: correct secretKey and 'url' must be supplied",
      400
    );
  }
};
