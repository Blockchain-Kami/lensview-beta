import { sendTransaction, writeContract } from "@wagmi/core";

import BONSAI_TOKEN_ABI from "../../abis/tokens/bonsai/bonsai-token-contract-abi.json";
import { tokenAddress } from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";
import { parseEther } from "viem";

export const sendTipUtilMatic = async (to: `0x${string}`, amount: string) => {
  try {
    const result = await sendTransaction(wagmiConfig, {
      to: to,
      value: parseEther(amount)
    });
    return {
      success: true,
      result: result,
      error: null
    };
  } catch (error) {
    console.log("error while sending tip", error);
    return {
      success: false,
      result: null,
      error: error
    };
  }
};

export const sendTipUtilBonsai = async (
  from: `0x${string}`,
  to: `0x${string}`,
  amount: string
) => {
  console.log("Hello from send bonsai", to, from);
  try {
    const result = await writeContract(wagmiConfig, {
      abi: BONSAI_TOKEN_ABI,
      address: tokenAddress.bonsai,
      functionName: "transfer",
      args: [to, parseEther(amount)],
      account: from
    });
    return {
      success: true,
      result: result,
      error: null
    };
  } catch (error) {
    console.log("error while sending tip", error);
    return {
      success: false,
      result: null,
      error: error
    };
  }
};
