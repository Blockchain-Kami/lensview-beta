import { sendTransaction } from "@wagmi/core";
import { wagmiConfig } from "../web3modal.util";
import { parseEther } from "viem";

export const sendMaticTipUtil = async (to: `0x${string}`, amount: string) => {
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
