import { waitForTransactionReceipt } from "@wagmi/core";
import { writeContract } from "@wagmi/core";

import { setVariablesTipUtil } from "./set-variables-tip.util";
import type {
  baseTokenSymbol,
  networks,
  polygonTokenSymbol,
  lineaTokenSymbol
} from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";

export const approveTokenWriteContractUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken:
    | keyof typeof polygonTokenSymbol
    | keyof typeof baseTokenSymbol
    | keyof typeof lineaTokenSymbol,
  from: `0x${string}`,
  amount: number
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    if (variables) {
      const tokenContractAddress = variables.tokenContractAddress;
      const ABI = variables.TOKEN_CONTRACT_ABI;
      const wagmiConfig = variables.wagmiConfig;
      const decimals = variables.decimals;
      const lensviewTippingAddress = variables.lensviewTippingAddress;
      const bigIntAmount = BigInt(amount * 10 ** decimals).toString();
      const tx = await writeContract(wagmiConfig, {
        abi: ABI,
        address: tokenContractAddress,
        functionName: "approve",
        args: [lensviewTippingAddress, bigIntAmount],
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
    }
  } catch (error) {
    console.log("error while approving amount", error);
    return {
      success: false,
      result: null,
      error: "Failed to approve amount"
    };
  }
};

export const tipTokenWriteContractUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken:
    | keyof typeof baseTokenSymbol
    | keyof typeof polygonTokenSymbol
    | lineaTokenSymbol,
  recipient: `0x${string}`,
  amount: number,
  fromProfileId: number | null,
  toProfileId: number,
  publicationId: number,
  from: `0x${string}`
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    if (variables) {
      const tokenContractAddress = variables.tokenContractAddress;
      const decimals = variables.decimals;
      const lensviewTippingAddress = variables.lensviewTippingAddress;
      const ABI = variables.LENSVIEW_TIPPING_CONTRACT_ABI;
      const bigIntAmount = BigInt(amount * 10 ** decimals).toString();
      const tx = await writeContract(wagmiConfig, {
        abi: ABI,
        address: lensviewTippingAddress,
        functionName: "tip",
        args: [
          tokenContractAddress,
          recipient,
          bigIntAmount,
          fromProfileId,
          toProfileId,
          publicationId
        ],
        account: from
      });
      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: tx
      });
      return {
        success: true,
        result: transactionReceipt,
        error: null
      };
    }
  } catch (error) {
    console.log("error while sending tip", error);
    return {
      success: false,
      result: null,
      error: error
    };
  }
};
