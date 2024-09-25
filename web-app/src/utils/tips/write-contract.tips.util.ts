import { waitForTransactionReceipt } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { LENSVIEW_TIPPING_ADDRESS } from "../../config/app-constants.config";
import { tokenAddress } from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";
import BONSAI_TOKEN_ABI from "../../abis/tokens/bonsai/bonsai-token-contract-abi.json";

export const approveTokenWriteContractUtil = async (
  token: keyof typeof tokenAddress,
  from: `0x${string}`,
  amount: number
) => {
  try {
    const tokenContractAddress: `0x${string}` = tokenAddress[token];
    const tx = await writeContract(wagmiConfig, {
      abi: BONSAI_TOKEN_ABI,
      address: tokenContractAddress,
      functionName: "approve",
      args: [LENSVIEW_TIPPING_ADDRESS, parseEther(amount.toString())],
      account: from
    });
    const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
      hash: tx
    });
    console.log("Approved transactionReceipt: ", transactionReceipt);
    return {
      success: true,
      result: transactionReceipt,
      error: null
    };
  } catch (error) {
    console.log("error while approving amount", error);
    return {
      success: false,
      result: null,
      error: error
    };
  }
};
