import createFollowLensService from "../services/lens/create-follow.lens.service";
import waitUntilTxCompleteUtil from "./wait-until-tx-complete.util";
import sponsoredTransactionUtil from "./sponsored-transaction.util";
import selfFundedTransactionUtil from "./self-funded-transaction.util";

// For more information on hoisting accounts,
// visit: https://viem.sh/docs/accounts/local.html#optional-hoist-the-account

//TODO: During unfollow implementation make it create follow
const followUtil = async (profileId: string) => {
  const response = await createFollowLensService(profileId);

  let txHash;

  if (response?.__typename === "FollowResponse") {
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

export default followUtil;
