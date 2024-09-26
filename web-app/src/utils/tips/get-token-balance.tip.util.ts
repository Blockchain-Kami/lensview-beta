import { getBalance, readContract } from "@wagmi/core";
import { wagmiConfig } from "../web3modal.util";
import BONSAI_TOKEN_ABI from "../../abis//tokens/bonsai/bonsai-token-contract-abi.json";
import { tokenAddress } from "../../config/app-constants.config";

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

export const getTokenBalanceTipUtilBonsai = async (address: `0x${string}`) => {
  try {
    console.log("------", address);
    const bonsaiBalance = await readContract(wagmiConfig, {
      abi: BONSAI_TOKEN_ABI,
      address: tokenAddress.BONSAI,
      functionName: "balanceOf",
      args: [address],
      account: address
    });
    return Number(bonsaiBalance) / 10 ** 18;
  } catch (error) {
    console.log("Failed to fetch balance. Error: ", error);
    return 0;
  }
};
