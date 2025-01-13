import createFollowLensService from "../services/lens/create-follow.lens.service";
import waitUntilTxCompleteUtil from "./wait-until-tx-complete.util";

const followUtil = async (profileId: string) => {
  const response = await createFollowLensService(profileId);

  let txHash = "";

  if (response?.__typename === "FollowResponse") {
    console.log("hash : ", response?.hash);
    txHash = response?.hash;
  }

  return waitUntilTxCompleteUtil(txHash, Date.now());
};

export default followUtil;
