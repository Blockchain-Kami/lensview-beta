import hasTxBeenIndexedLensService from "../../services/lens/has-tx-been-indexed.lens.service";
import { LensTransactionStatusType } from "../../gql/graphql";
import type { LensTransactionStatusQuery } from "../../gql/graphql";
import { logger } from "../../log/log-manager.log";

/**
 * Waits until the specified transaction is complete and returns the transaction status query.
 *
 * @param {{ forTxHash: string } | { forTxId: string }} input - The input object containing either the transaction hash or the transaction ID.
 * @param {number} startTime - The start time of the function execution.
 * @return {Promise<LensTransactionStatusQuery | undefined>} A promise that resolves to the transaction status query if the transaction is complete, or undefined if the transaction is not found.
 */
export const hasTransactionBeenIndexedIndexerUtil = async (
  input: { forTxHash: string } | { forTxId: string },
  startTime: number
): Promise<LensTransactionStatusQuery | undefined> => {
  logger.info(
    "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: Execution started."
  );
  logger.info(
    "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: Input Parameter: Transaction ID: " +
      JSON.stringify(input)
  );
  if (Date.now() - startTime > 45000) {
    logger.error(
      "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: Timeout: 45 seconds exceeded. Transaction ID: " +
        JSON.stringify(input)
    );
    throw new Error("Tx timeout");
  }
  const response = await hasTxBeenIndexedLensService(input);

  if (!response) {
    logger.error(
      "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: No response from hasTxBeenIndexedLensService:"
    );
    throw new Error("No response from hasTxBeenIndexedLensService");
  }

  switch (response.lensTransactionStatus?.status) {
    case LensTransactionStatusType.Failed:
      logger.error(
        "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: Indexing failed: Transaction ID: " +
          JSON.stringify(input)
      );
      throw new Error(
        response.lensTransactionStatus.reason ?? "Transaction failed"
      );

    case LensTransactionStatusType.Processing:
      logger.info(
        "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: still processing: Transaction ID: " +
          JSON.stringify(input)
      );
      break;

    case LensTransactionStatusType.Complete:
      logger.info(
        "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: complete and indexed onchain: Transaction ID: " +
          JSON.stringify(input)
      );
      return response;
  }
  logger.info(
    "has-transaction-been-indexed.indexer.util.ts: hasTransactionBeenIndexedIndexerUtil: sleep for 1500 milliseconds then try again"
  );
  // sleep for before trying again
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return await hasTransactionBeenIndexedIndexerUtil(input, startTime);
};
