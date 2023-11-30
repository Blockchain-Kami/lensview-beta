import hasTxBeenIndexedLensService from "../../services/lens/has-tx-been-indexed.lens.service";
import { LensTransactionStatusType } from "../../gql/graphql";
import type { LensTransactionStatusQuery } from "../../gql/graphql";

/**
 * Waits until the specified transaction is complete and returns the transaction status query.
 *
 * @param {{ forTxHash: string } | { forTxId: string }} input - The input object containing either the transaction hash or the transaction ID.
 * @param {number} startTime - The start time of the function execution.
 * @return {Promise<LensTransactionStatusQuery | undefined>} A promise that resolves to the transaction status query if the transaction is complete, or undefined if the transaction is not found.
 */
export const waitUntilComplete: any = async (
  input: { forTxHash: string } | { forTxId: string },
  startTime: number
): Promise<LensTransactionStatusQuery | undefined>  => {
  if (Date.now() - startTime > 45000) {
    throw new Error("Tx timeout");
  }
  const response = await hasTxBeenIndexedLensService(input);

  if (!response) {
    throw new Error("No response from hasTxBeenIndexedLensService");
  }

  console.log("pool until indexed: result", response);

  switch (response.lensTransactionStatus?.status) {
    case LensTransactionStatusType.Failed:
      throw new Error(
        response.lensTransactionStatus.reason ?? "Transaction failed"
      );

    case LensTransactionStatusType.Processing:
      console.log("still in progress");
      break;

    case LensTransactionStatusType.Complete:
      console.log("complete and indexed onchain");
      return response;
  }

  console.log("pool until indexed: sleep for 1500 milliseconds then try again");
  // sleep for before trying again
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return await waitUntilComplete(input, startTime);
};
