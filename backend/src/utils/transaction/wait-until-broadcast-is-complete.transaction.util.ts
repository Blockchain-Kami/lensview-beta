import type {
  LensProfileManagerRelayError,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import { hasTransactionBeenIndexedIndexerUtil } from "../indexer/has-transaction-been-indexed.indexer.util";

export async function waitUntilBroadcastIsCompleteTransactionUtil(
  broadcastResult: RelaySuccess | RelayError,
  broadcastName?: string // for logging e.g. 'create post'
) {
  const actionToBroadcast = broadcastName ?? "broadcast";
  console.log(actionToBroadcast, { broadcastResult });

  if (broadcastResult.__typename !== "RelaySuccess") {
    console.error(`${actionToBroadcast}: failed`, broadcastResult);
    throw new Error(`${actionToBroadcast}: failed`);
  }

  console.log(`${actionToBroadcast}: poll until indexed`);
  const indexedResult = await hasTransactionBeenIndexedIndexerUtil(
    {
      forTxId: broadcastResult.txId
    },
    Date.now()
  );
  console.log(`${actionToBroadcast}: has been indexed`, indexedResult);

  console.log(`${actionToBroadcast}: complete`);
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
