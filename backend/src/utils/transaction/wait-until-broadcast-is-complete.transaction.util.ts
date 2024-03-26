import type {
  LensProfileManagerRelayError,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import { hasTransactionBeenIndexedIndexerUtil } from "../indexer/has-transaction-been-indexed.indexer.util";
import { logger } from "../../log/log-manager.log";

export async function waitUntilBroadcastIsCompleteTransactionUtil(
  broadcastResult: RelaySuccess | RelayError,
  broadcastName?: string // for logging e.g. 'create post'
) {
  const actionToBroadcast = broadcastName ?? "broadcast";
  if (broadcastResult.__typename !== "RelaySuccess") {
    logger.warn(
      "wait-until-broadcast-is-complete.transaction.util.ts: waitUntilBroadcastIsCompleteTransactionUtil: " +
        actionToBroadcast +
        ": failed, broadcast result: " +
        broadcastResult
    );
    throw new Error(`${actionToBroadcast}: failed`);
  }
  logger.info(
    "wait-until-broadcast-is-complete.transaction.util.ts: waitUntilBroadcastIsCompleteTransactionUtil: " +
      actionToBroadcast +
      ": pool until indexed"
  );
  const indexedResult = await hasTransactionBeenIndexedIndexerUtil(
    {
      forTxId: broadcastResult.txId
    },
    Date.now()
  );
  logger.info(
    "wait-until-broadcast-is-complete.transaction.util.ts: waitUntilBroadcastIsCompleteTransactionUtil: " +
      actionToBroadcast +
      ": has been indexed. Indexed Result: " +
      JSON.stringify(indexedResult)
  );
}

export async function waitUntilLensManagerTransactionIsComplete(
  result: RelaySuccess | LensProfileManagerRelayError,
  name: string
) {
  console.log("lens profile manager with action - ", { name });

  if (result.__typename !== "RelaySuccess") {
    console.error(`${result}: failed`, result);
    throw new Error(`${result}: failed`);
  }

  console.log(`${result}: poll until indexed`);
  const indexedResult = await hasTransactionBeenIndexedIndexerUtil(
    { forTxId: result.txId },
    Date.now()
  );
  console.log(`${result}: has been indexed`, indexedResult);

  console.log(`${result}: complete`);
}
