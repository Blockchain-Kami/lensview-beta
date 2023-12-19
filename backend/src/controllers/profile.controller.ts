import { Request, Response } from "express";
import { profileInfoForHandleLensService } from "../services/lens/profile-info-for-handle.lens.service";
import { httpStatusCodes } from "../config/app-constants.config";

export const getProfileInfoForHandleController = async (
  req: Request<unknown, unknown, unknown, { lensHandle: string }>,
  res: Response
) => {
  try {
    const lensHandle = req.query.lensHandle;
    const response = await profileInfoForHandleLensService(lensHandle);
    if (response.data) {
      return res.status(httpStatusCodes.OK).send(response.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
