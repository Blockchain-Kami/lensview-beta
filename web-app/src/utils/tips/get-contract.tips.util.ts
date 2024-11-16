import { readContract } from "@wagmi/core";
import type {
  baseTokenSymbol,
  networks,
  polygonTokenSymbol,
  lineaTokenSymbol
} from "../../config/app-constants.config";
import { setVariablesTipUtil } from "./set-variables-tip.util";

export const hasAmountApprovedGetContractTipsUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken:
    | keyof typeof baseTokenSymbol
    | keyof typeof polygonTokenSymbol
    | keyof typeof lineaTokenSymbol,
  fromAddress: `0x${string}`,
  enteredAmount: number
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    if (variables) {
      const tokenContractAddress = variables.tokenContractAddress;
      const decimals = variables.decimals;
      const wagmiConfig = variables.wagmiConfig;
      const lensviewTippingAddress = variables.lensviewTippingAddress;
      const ABI = variables.LENSVIEW_TIPPING_CONTRACT_ABI;
      // Check allowance
      const approvedTokenAmount = await readContract(wagmiConfig, {
        abi: ABI,
        address: lensviewTippingAddress,
        functionName: "checkAllowance",
        args: [tokenContractAddress, fromAddress],
        account: fromAddress
      });
      console.log("Approved amount", approvedTokenAmount);
      return Number(approvedTokenAmount) / 10 ** decimals >= enteredAmount;
    }
  } catch (error) {
    console.log("Error occurred while checking allowance", error);
    return false;
  }
};

export const getTokenBalanceGetContractTipsUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken:
    | keyof typeof baseTokenSymbol
    | keyof typeof polygonTokenSymbol
    | keyof typeof lineaTokenSymbol,
  address: `0x${string}`
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    if (variables) {
      const tokenContractAddress = variables.tokenContractAddress;
      const ABI = variables.TOKEN_CONTRACT_ABI;
      const wagmiConfig = variables.wagmiConfig;
      const decimals = variables.decimals;
      const tokenBalance = await readContract(wagmiConfig, {
        abi: ABI,
        address: tokenContractAddress,
        functionName: "balanceOf",
        args: [address],
        account: address
      });
      console.log("-----", Number(tokenBalance));
      return Number(tokenBalance) / 10 ** decimals;
    }
  } catch (error) {
    console.log("Failed to fetch balance. Error: ", error);
    return 0;
  }
};
