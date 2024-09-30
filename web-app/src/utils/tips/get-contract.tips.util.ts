import { readContract } from "@wagmi/core";
import {
  LENSVIEW_TIPPING_ADDRESS,
  tokenSymbol
} from "../../config/app-constants.config";
import { tokenAddress } from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";
import { getTokenBalanceTipUtilMatic } from "./get-token-balance.tip.util";
import LENSVIEW_TIPPING_ABI from "../../abis/contracts/tip/tip.contract.abi.json";
import BONSAI_TOKEN_ABI from "../../abis/tokens/bonsai/bonsai.token.abi.json";
import USDT_TOKEN_ABI from "../../abis/tokens/usdt/usdt.token.abi.json";
import POINTLESS_TOKEN_ABI from "../../abis/tokens/pointless/pointless.token.abi.json";

export const hasAmountApprovedGetContractTipsUtil = async (
  selectedToken: keyof typeof tokenSymbol,
  fromAddress: `0x${string}`,
  enteredAmount: number
) => {
  try {
    if (selectedToken === tokenSymbol.MATIC) {
      return true;
    }
    const tokenContractAddress: `0x${string}` = tokenAddress[selectedToken];
    const approvedTokenAmount = await readContract(wagmiConfig, {
      abi: LENSVIEW_TIPPING_ABI,
      address: LENSVIEW_TIPPING_ADDRESS,
      functionName: "checkAllowance",
      args: [tokenContractAddress, fromAddress],
      account: fromAddress
    });
    console.log("Approved amount", approvedTokenAmount);
    return Number(approvedTokenAmount) / 10 ** 18 >= enteredAmount;
  } catch (error) {
    console.log("Error occurred while checking allowance", error);
    return false;
  }
};

export const getTokenBalanceGetContractTipsUtil = async (
  token: keyof typeof tokenSymbol,
  address: `0x${string}`
) => {
  try {
    let tokenContractAddress, ABI;
    switch (token) {
      case "BONSAI":
        tokenContractAddress = tokenAddress.BONSAI;
        ABI = BONSAI_TOKEN_ABI;
        break;
      case "USDT":
        tokenContractAddress = tokenAddress.USDT;
        ABI = USDT_TOKEN_ABI;
        break;
      case "POINTLESS":
        tokenContractAddress = tokenAddress.POINTLESS;
        ABI = POINTLESS_TOKEN_ABI;
        break;
      case "MATIC":
        return await getTokenBalanceTipUtilMatic(address);
    }
    const tokenBalance = await readContract(wagmiConfig, {
      abi: ABI,
      address: tokenContractAddress,
      functionName: "balanceOf",
      args: [address],
      account: address
    });
    return Number(tokenBalance) / 10 ** 18;
  } catch (error) {
    console.log("Failed to fetch balance. Error: ", error);
    return 0;
  }
};
