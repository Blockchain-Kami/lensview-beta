import { Request, Response, NextFunction } from "express";
import baseClientUtil from "../utils/lens-protocol/base-client.util";
import getDefaultProfileGraphql from "../graphql/get-default-profile.graphql";
import { APP_ADDRESS } from "../config/env.config";

/**
 * Get the handle.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param _next - The next function.
 * @returns The handle object.
 */
export const getHandle = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const response = await baseClientUtil
    .query(getDefaultProfileGraphql, { address: APP_ADDRESS })
    .toPromise();

  res.status(200).json({
    handle: response?.data?.defaultProfile.handle
  });
};
