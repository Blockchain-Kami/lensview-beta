import transactionStatusLensService from "../services/lens/transaction-status.lens.service";
import type { TransactionStatusQuery } from "../gql/graphql";
import type { OperationResult } from "@urql/core";

const waitUntilTxCompleteUtil = async (
  forTxHash: string,
  startTime: number
): Promise<OperationResult<TransactionStatusQuery> | undefined> => {
  if (Date.now() - startTime > 45000) {
    throw new Error("Tx timeout");
  }
  const response = await transactionStatusLensService(forTxHash);

  if (!response) {
    throw new Error("No response from hasTxBeenIndexedLensService");
  }

  console.log("pool until indexed: result", response);

  switch (response?.data?.transactionStatus.__typename) {
    case "FailedTransactionStatus":
      throw new Error(
        response?.data?.transactionStatus.reason ?? "Transaction failed"
      );

    case "NotIndexedYetStatus":
      console.log("Not indexed yet");
      break;

    case "PendingTransactionStatus":
      console.log("still pending");
      break;

    case "FinishedTransactionStatus":
      console.log("complete and indexed onchain");
      return response;
  }

  console.log("pool until indexed: sleep for 1500 milliseconds then try again");
  // sleep for before trying again
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return await waitUntilTxCompleteUtil(forTxHash, startTime);
};

export default waitUntilTxCompleteUtil;
