import { Request, Response } from "express";
import { profileInfoForHandleLensService } from "../services/lens/profile-info.lens.service";

export const getProfileInfoForHandleController = async (
    req: Request<unknown, unknown, unknown, { lensHandle: string }>,
    res: Response
) => {
    const lensHandle = req.query.lensHandle;
    const response = await profileInfoForHandleLensService(lensHandle);
}