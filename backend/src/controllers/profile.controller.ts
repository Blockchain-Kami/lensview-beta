import { Request, Response } from "express";
import { summaryProfileUtils } from "../utils/prolfile/summary.profile.utils";
import ProfileSummaryResponseModel from "../models/response/profile-summary-response.model";

export const getProfileDetailsController = async (
  req: Request<unknown, unknown, unknown, { handle: string }>,
  res: Response<ProfileSummaryResponseModel>
): Promise<void> => {
  let profileSummary: ProfileSummaryResponseModel = {
    displayName: null,
    bio: null,
    displayImage: null,
    coverImage: null,
    reactions: 0,
    publications: 0,
    poapCount: 0,
    lensProfileName: null,
    farcasterProfileName: null,
    lensJoinDate: null,
    farcasterJoinDate: null,
    lensFollowers: 0,
    farcasterFollowers: 0,
    CIS: 0
  };
  try {
    const requestLensHandle = req.query.handle;

    profileSummary = await summaryProfileUtils(requestLensHandle);

    res.status(200).send(profileSummary);
  } catch (error) {
    res.status(500).send(profileSummary);
  }
};
