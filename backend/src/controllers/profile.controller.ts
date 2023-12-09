import { Request, Response } from "express";
import { summaryProfileUtils } from "../utils/prolfile/summary.profile.utils";
import ProfileSummaryResponseModel from "../models/response/profile-summary-response.model";
import { CISDashboardDataProfileUtil } from "../utils/prolfile/cis-dashboard-data.profile.util";
import { getSimilarPoapDetailsAirstackService } from "../services/airstack/get-similar-poap-details.airstack.service";
import { getSocialOverlapProfileUtil } from "../utils/prolfile/get-social-overlap.profile.util";

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

export const getSimilarityProfileController = async (
  req: Request<
    unknown,
    unknown,
    {
      handle1: string;
      handle2: string;
    },
    unknown
  >,
  res: Response
) => {
  try {
    const handle1 = req.body.handle1;
    const handle2 = req.body.handle2;
    const poapDetails = await getSimilarPoapDetailsAirstackService(
      handle1,
      handle2
    );
    const poapCount = poapDetails.Poap.length;
    const commonSocials = await getSocialOverlapProfileUtil(handle1, handle2);
    const haveENS = commonSocials.ens ? true : false;
    const haveLens = commonSocials.lens ? true : false;
    const haveFarcaster = commonSocials.farcaster ? true : false;
    const haveXMPT = commonSocials.xmtp ? true : false;

    const similarityScore =
      (Number(haveENS) +
        Number(haveLens) +
        Number(haveFarcaster) +
        Number(haveXMPT) +
        Number(haveXMPT) +
        poapCount / 100) /
      6;
    res.status(200).send({
      similarityScore: similarityScore * 100,
      haveENS,
      haveLens,
      haveFarcaster,
      haveXMPT,
      poapCount,
      poapDetails
    });
  } catch (error) {
    res.status(500).send("Something went wrong: " + error);
  }
};
