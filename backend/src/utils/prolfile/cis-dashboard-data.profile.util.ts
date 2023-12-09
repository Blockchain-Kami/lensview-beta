import { getProfileDetailsAirstackService } from "../../services/airstack/get-profile-details.airstack.service";
import { getProfileDetailsLensService } from "../../services/lens/get-profile-details.lens.service";
import { getPoapCountAirstackService } from "../../services/airstack/get-poap-count.airstack.service";
import { calculateCISProfileUtils } from "./calculate-cis.profile.utils";
import { InternalServerError } from "../../errors/internal-server-error.error";

export const CISDashboardDataProfileUtil = async (handle: string) => {
  try {
    const profileAirstackSummary =
      await getProfileDetailsAirstackService(handle);
    const profileLensSummary = await getProfileDetailsLensService(handle);
    const poapCount = await getPoapCountAirstackService(handle);

    const lensDetails = profileAirstackSummary.Wallet?.lensSocials;
    const farcasterDetails = profileAirstackSummary.Wallet?.farcasterSocials;

    const lensJoinDate = lensDetails
      ? formatDate(lensDetails[0]?.profileCreatedAtBlockTimestamp)
      : null;
    const farcasterJoinDate = farcasterDetails
      ? formatDate(farcasterDetails[0]?.profileCreatedAtBlockTimestamp)
      : null;

    const reactions = profileLensSummary.data?.profile
      ? profileLensSummary.data?.profile?.stats?.reactions
      : null;
    const publications = profileLensSummary.data?.profile
      ? profileLensSummary.data?.profile?.stats?.publications
      : null;

    const lensFollowers = calculateFollowers(lensDetails);
    const farcasterFollowers = calculateFollowers(farcasterDetails);

    return calculateCISProfileUtils({
      lensFollowers,
      farcasterFollowers: farcasterFollowers,
      reactions: reactions ? reactions : 0,
      publications: publications ? publications : 0,
      lensCreateDate: lensJoinDate ? new Date(lensJoinDate) : null,
      farcasterCreateDate: farcasterJoinDate
        ? new Date(farcasterJoinDate)
        : null,
      poapCount: poapCount ? poapCount : 0
    });
  } catch (error) {
    throw new InternalServerError(
      "Error while fetching CIS Dashboard Data: " + error,
      500
    );
  }
};

const calculateFollowers = (socials: [any]) => {
  if (!socials) {
    return 0;
  }
  let sum = 0;
  socials.forEach((profile) => {
    sum += profile?.followerCount;
  });
  return sum;
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("default", { month: "long" });
  return `${month}, ${year}`;
};
