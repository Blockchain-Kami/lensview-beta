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
    reactions: null,
    publications: null,
    poapCount: null,
    lensHandle: null,
    farcasterHandle: null,
    lensJoinDate: null,
    farcasterJoinDate: null,
    lensFollowers: null,
    farcasterFollowers: null,
    CIS: null
  };
  try {
    const requestLensHandle = req.query.handle;

    profileSummary = await summaryProfileUtils(requestLensHandle);

    res.status(200).send(profileSummary);
  } catch (error) {
    res.status(500).send(profileSummary);
  }
};
