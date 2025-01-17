import sponsoredTransactionUtil from "./sponsored-transaction.util";
import selfFundedTransactionUtil from "./self-funded-transaction.util";
import waitUntilTxCompleteUtil from "./wait-until-tx-complete.util";
import createUnfollowLensService from "../services/lens/create-unfollow.lens.service";

const createUnfollowUtil = async (profileId: string) => {
  const response = await createUnfollowLensService(profileId);

  let txHash;

  if (response?.__typename === "UnfollowResponse") {
    console.log("hash : ", response?.hash);

    txHash = response?.hash;
  } else if (response?.__typename === "SponsoredTransactionRequest") {
    console.log("SponsoredTransactionRequest raw");

    txHash = await sponsoredTransactionUtil(response?.raw);
  } else if (response?.__typename === "SelfFundedTransactionRequest") {
    console.log("SelfFundedTransactionRequest raw");

    txHash = await selfFundedTransactionUtil(response?.raw);
  } else if (response?.__typename === "TransactionWillFail") {
    throw new Error(response?.reason);
  }

  return waitUntilTxCompleteUtil(txHash, Date.now());
};

export default createUnfollowUtil;
