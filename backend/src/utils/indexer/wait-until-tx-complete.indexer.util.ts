import transactionStatusLensService from "../../services/lens/transaction-status.lens.service.js";
import type { TransactionStatusQuery } from "../../gql/graphql.js";
import type { OperationResult } from "@urql/core";
import { logger } from "../../log/log-manager.log.js";

const waitUntilTxCompleteUtil = async (
  forTxHash: string,
  startTime: number
): Promise<OperationResult<TransactionStatusQuery> | undefined> => {
  logger.info(
    "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Execution Started."
  );
  if (Date.now() - startTime > 45000) {
    throw new Error("Tx timeout");
  }
  const response = await transactionStatusLensService(forTxHash);

  if (!response) {
    throw new Error("No response from hasTxBeenIndexedLensService");
  }

  switch (response?.data?.transactionStatus.__typename) {
    case "FailedTransactionStatus":
      logger.error(
        "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Execution End: Transaction failed with status: " +
          JSON.stringify(response?.data?.transactionStatus)
      );
      throw new Error(
        response?.data?.transactionStatus.reason ?? "Transaction failed"
      );

    case "NotIndexedYetStatus":
      logger.info(
        "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Transaction Status: Not Indexed Yet."
      );
      break;

    case "PendingTransactionStatus":
      logger.info(
        "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Transaction Status: Pending Transaction Status."
      );
      break;

    case "FinishedTransactionStatus":
      logger.info(
        "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Transaction Status: Transaction Indexed!"
      );
      return response;
  }

  logger.info(
    "wait-until-tx-complete.indexer.util.ts: waitUntilTxCompleteUtil: Transaction Status: Waiting for indexing...."
  );
  // sleep for before trying again
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return await waitUntilTxCompleteUtil(forTxHash, startTime);
};

export default waitUntilTxCompleteUtil;
