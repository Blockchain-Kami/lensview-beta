import { CISParamtersProfileModel } from "../../models/profile/cis-paramters.profile.model";

const weights = {
  lensFollowersWeight: 0.025,
  farcasterFollowersWeight: 0.025,
  reactionsWeight: 0.05,
  publicationsWeight: 0.025,
  poapCountWeight: 0.025,
  accountAgeWeight: 0.025
};

export const calculateCISProfileUtils = (
  accountDetails: CISParamtersProfileModel
) => {
  // const lensAccountAge = getMonthDifference(
  //   new Date(),
  //   accountDetails.lensCreateDate
  // );
  // const farcasterAccountAge = getMonthDifference(
  //   new Date(),
  //   accountDetails.farcasterCreateDate
  // );

  // const CISNumerator = (accountDetails.lensFollowers * weights.lensFollowersWeight) +
  //     (accountDetails.farcasterFollowers * weights.farcasterFollowersWeight) +
  //     (accountDetails.reactions * weights.reactionsWeight) +
  //     (accountDetails.publications * weights.publicationsWeight) +
  //     (accountDetails.poapCount * weights.poapCountWeight) +
  //     (lensAccountAge * weights.accountAgeWeight) +
  //     (farcasterAccountAge * weights.accountAgeWeight);

  // const CISDenominator = weights.lensFollowersWeight + weights.farcasterFollowersWeight + weights.reactionsWeight + weights.publicationsWeight + weights.poapCountWeight + weights.accountAgeWeight + weights.accountAgeWeight;
  // const CISDenominator = 6;
  // const CIS = Math.ceil((CISNumerator / CISDenominator));

  const followerScore = getFollowerScore(
    accountDetails.lensFollowers,
    accountDetails.farcasterFollowers
  );
  const postScore = Math.ceil(
    accountDetails.publications * weights.publicationsWeight * 10
  );
  const reactionScore = Math.ceil(
    (accountDetails.reactions * weights.reactionsWeight) / 10
  );
  const poapScore = Math.ceil(
    accountDetails.poapCount * weights.poapCountWeight
  );
  const CIS = followerScore + postScore + reactionScore + poapScore;

  return {
    followerScore,
    postScore,
    reactionScore,
    poapScore,
    CIS
  };
};

// const getMonthDifference = (startDate: Date, endDate: Date | null) => {
//   if (!endDate) {
//     return 0;
//   }
//   return (
//     endDate.getMonth() -
//     startDate.getMonth() +
//     12 * (endDate.getFullYear() - startDate.getFullYear())
//   );
// };

const getFollowerScore = (
  lensFollowers: number,
  farcasterFollowers: number
) => {
  const followerScoreNumerator =
    lensFollowers * weights.lensFollowersWeight +
    farcasterFollowers * weights.farcasterFollowersWeight;
  const followerScoreDenominator =
    (weights.lensFollowersWeight + weights.farcasterFollowersWeight) * 100;
  return Math.ceil(followerScoreNumerator / followerScoreDenominator);
};
