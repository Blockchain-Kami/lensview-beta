import walletClientUtil from "./wallet-client.util";
import { sendTransaction } from "viem/zksync";
import selfFundedTransactionDataHelperUtil from "./helper/self-funded-transaction-data.helper.util";
import type { Eip1559TransactionRequest } from "../gql/graphql";

const selfFundedTransactionUtil = async (raw: Eip1559TransactionRequest) => {
  const walletClient = await walletClientUtil();

  return await sendTransaction(walletClient, {
    account: walletClient.account,
    ...selfFundedTransactionDataHelperUtil(raw)
  });
};

export default selfFundedTransactionUtil;
