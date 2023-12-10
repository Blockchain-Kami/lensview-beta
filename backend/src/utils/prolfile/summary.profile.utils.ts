import { getProfileDetailsAirstackService } from "../../services/airstack/get-profile-details.airstack.service";
import { getProfileDetailsLensService } from "../../services/lens/get-profile-details.lens.service";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { getPoapCountAirstackService } from "../../services/airstack/get-poap-count.airstack.service";
import { calculateCISProfileUtils } from "./calculate-cis.profile.utils";

export const summaryProfileUtils = async (handle: string) => {
  try {
    const profileAirstackSummary =
      await getProfileDetailsAirstackService(handle);
    const profileLensSummary = await getProfileDetailsLensService(handle);
    const poapCount = await getPoapCountAirstackService(handle);

    const lensDetails = profileAirstackSummary.Wallet?.lensSocials;
    const farcasterDetails = profileAirstackSummary.Wallet?.farcasterSocials;

    const lensProfileName =
      profileLensSummary?.data?.profile?.handle?.fullHandle;
    const farcasterProfileName = farcasterDetails
      ? farcasterDetails[0]?.profileName
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

    const displayName = profileLensSummary?.data?.profile?.metadata?.displayName
      ? profileLensSummary.data.profile?.metadata?.displayName
      : lensDetails[0].profileDisplayName;

    const bio = lensDetails[0]?.profileBio
      ? lensDetails[0]?.profileBio
      : profileLensSummary?.data?.profile?.metadata?.bio;
    const displayImage = lensDetails[0]?.profileImageContentValue
      ? lensDetails[0]?.profileImageContentValue?.image?.large
      : null;
    const coverImage = profileLensSummary.data
      ? profileLensSummary.data?.profile?.metadata?.coverPicture?.optimized?.uri
      : null;

    const isXMTPEnabled = profileAirstackSummary.Wallet?.xmtp[0].isXMTPEnabled;

    const lensFollowers = calculateFollowers(lensDetails);
    const farcasterFollowers = calculateFollowers(farcasterDetails);

    const CIS = calculateCISProfileUtils({
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

    return {
      lensProfileName: lensProfileName ? lensProfileName : null,
      farcasterProfileName: farcasterProfileName ? farcasterProfileName : null,
      lensJoinDate: lensJoinDate ? lensJoinDate : null,
      farcasterJoinDate: farcasterJoinDate ? farcasterJoinDate : null,
      reactions: reactions ? reactions : 0,
      publications: publications ? publications : 0,
      displayName: displayName ? displayName : null,
      bio: bio ? bio : null,
      displayImage: displayImage
        ? displayImage
        : "https://i.postimg.cc/6QGt2nfj/leny.jpg",
      coverImage: coverImage
        ? coverImage
        : "https://i.postimg.cc/3xq3xnm0/lens-protocol-cover.jpg",
      lensFollowers: lensFollowers ? lensFollowers : 0,
      farcasterFollowers: farcasterFollowers ? farcasterFollowers : 0,
      poapCount: poapCount ? poapCount : 0,
      CIS: CIS.CIS,
      isXMTPEnabled: isXMTPEnabled ? true : false
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
