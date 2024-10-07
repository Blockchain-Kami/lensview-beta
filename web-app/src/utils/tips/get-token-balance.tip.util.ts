import { getBalance } from "@wagmi/core";
import { wagmiConfig } from "../web3modal.util";

export const getTokenBalanceTipUtilMatic = async (address: `0x${string}`) => {
  try {
    const balance = await getBalance(wagmiConfig, {
      address
    });
    return balance.formatted;
  } catch (error) {
    console.log("Failed to fetch balance. Error: ", error);
    return 0;
  }
};
