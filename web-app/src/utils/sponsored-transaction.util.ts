import walletClientUtil from "./wallet-client.util";
import { sendEip712Transaction } from "viem/zksync";
import sponsoredTransactionDataHelperUtil from "./helper/sponsored-transaction-data.helper.util";
import type { Eip712TransactionRequest } from "../gql/graphql";

const sponsoredTransactionUtil = async (raw: Eip712TransactionRequest) => {
  const walletClient = await walletClientUtil();

  return await sendEip712Transaction(walletClient, {
    account: walletClient.account,
    ...sponsoredTransactionDataHelperUtil(raw)
  });
};

export default sponsoredTransactionUtil;
