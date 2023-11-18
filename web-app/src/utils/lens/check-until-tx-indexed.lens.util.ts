import getLensTransactionStatusLensService from "../../services/lens/get-lens-transaction-status.lens.service";
import { DelayUtil } from "../delay.util";

const checkUntilTxIndexedLensUtil = async (
  txId: string | null,
  txHash: string | null,
  startTime: number
): Promise<void> => {
  if (Date.now() - startTime > 25000) {
    throw new Error("Tx timeout");
  }

  const response = await getLensTransactionStatusLensService(txId, txHash);

  const status = response.data?.lensTransactionStatus?.status;

  if (status === "COMPLETE") return;

  if (status === "FAILED") {
    throw new Error("Tx failed");
  }

  if (status === "OPTIMISTICALLY_UPDATED") {
    throw new Error("Tx optimistically updated");
  }

  await DelayUtil.delay(1000);

  return await checkUntilTxIndexedLensUtil(txId, txHash, startTime);
};

export default checkUntilTxIndexedLensUtil;
