import { Request, Response } from "express";
import { summaryProfileUtils } from "../utils/prolfile/summary.profile.utils";
import ProfileSummaryResponseModel from "../models/response/profile-summary-response.model";
import { CISDashboardDataProfileUtil } from "../utils/prolfile/cis-dashboard-data.profile.util";
import { getPoapDetailsAirstackService } from "../services/airstack/get-poap-details.airstack.service";

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

export const getProfileCisDashboardController = async (
  req: Request<unknown, unknown, unknown, { handle: string }>,
  res: Response
) => {
  try {
    const requestLensHandle = req.query.handle;
    const CISDashboardData =
      await CISDashboardDataProfileUtil(requestLensHandle);
    res.status(200).send(CISDashboardData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProfilePoapController = async (
  req: Request<unknown, unknown, unknown, { handle: string }>,
  res: Response
) => {
  try {
    const requestLensHandle = req.query.handle;
    const poapDetails = await getPoapDetailsAirstackService(requestLensHandle);
    res.status(200).send(poapDetails);
  } catch (error) {
    res.status(500).send("Something went wrong: " + error);
  }
};
