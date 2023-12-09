import { getProfileDetailsAirstackService } from "../../services/airstack/get-profile-details.airstack.service";
import { getProfileDetailsLensService } from "../../services/lens/get-profile-details.lens.service";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { getPoapCountAirstackService } from "../../services/airstack/get-poap-count.airstack.service";

export const summaryProfileUtils = async (handle: string) => {
  try {
    const profileAirstackSummary =
      await getProfileDetailsAirstackService(handle);
    const profileLensSummary = await getProfileDetailsLensService(handle);
    const poapCount = await getPoapCountAirstackService(handle);

    const lensDetails = profileAirstackSummary.Wallet?.lensSocials;
    const farcasterDetails = profileAirstackSummary.Wallet?.farcasterSocials;

    const lensHandle = lensDetails ? lensDetails[0]?.profileHandle : null;
    const farcasterHandle = farcasterDetails
      ? farcasterDetails[0]?.profileHandle
      : null;

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
    const displayName = lensDetails[0]?.profileDisplayName;
    const bio = lensDetails[0]?.bio;
    const displayImage = lensDetails[0]?.profileImageContentValue
      ? lensDetails[0]?.profileImageContentValue?.image?.large
      : null;
    const coverImage = profileLensSummary.data
      ? profileLensSummary.data?.profile?.metadata?.coverPicture?.optimized?.uri
      : null;

    const lensFollowers = calculateFollowers(lensDetails);
    const farcasterFollowers = calculateFollowers(farcasterDetails);

    const CIS = 124.5;

    return {
      lensHandle: lensHandle ? lensHandle : null,
      farcasterHandle: farcasterHandle ? farcasterHandle : null,
      lensJoinDate: lensJoinDate ? lensJoinDate : null,
      farcasterJoinDate: farcasterJoinDate ? farcasterJoinDate : null,
      reactions: reactions ? reactions : null,
      publications: publications ? publications : null,
      displayName: displayName ? displayName : null,
      bio: bio ? bio : null,
      displayImage: displayImage ? displayImage : null,
      coverImage: coverImage ? coverImage : null,
      lensFollowers: lensFollowers ? lensFollowers : null,
      farcasterFollowers: farcasterFollowers ? farcasterFollowers : null,
      poapCount: poapCount ? poapCount : null,
      CIS: CIS ? CIS : null
    };
  } catch (error) {
    throw new InternalServerError("Error in profile summary: " + error, 500);
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
