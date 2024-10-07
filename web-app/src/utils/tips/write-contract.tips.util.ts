import { waitForTransactionReceipt } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import {
  LENSVIEW_TIPPING_ADDRESS,
  tokenDecimals,
  tokenSymbol
} from "../../config/app-constants.config";
import { tokenAddress } from "../../config/app-constants.config";
import { wagmiConfig } from "../web3modal.util";
import LENSVIEW_TIPPING_CONTRACT_ABI from "../../abis/contracts/tip/tip.contract.abi.json";
import BONSAI_TOKEN_ABI from "../../abis/tokens/bonsai/bonsai.token.abi.json";
import USDT_TOKEN_ABI from "../../abis/tokens/usdt/usdt.token.abi.json";
import POINTLESS_TOKEN_ABI from "../../abis/tokens/pointless/pointless.token.abi.json";

export const approveTokenWriteContractUtil = async (
  token: keyof typeof tokenSymbol,
  from: `0x${string}`,
  amount: number
) => {
  try {
    let tx: `0x${string}` = "0x";
    switch (token) {
      case "BONSAI":
        tx = await writeContract(wagmiConfig, {
          abi: BONSAI_TOKEN_ABI,
          address: tokenAddress.BONSAI,
          functionName: "approve",
          args: [
            LENSVIEW_TIPPING_ADDRESS,
            (+amount * 10 ** tokenDecimals.BONSAI).toString()
          ],
          account: from
        });
        break;
      case "POINTLESS":
        tx = await writeContract(wagmiConfig, {
          abi: POINTLESS_TOKEN_ABI,
          address: tokenAddress.POINTLESS,
          functionName: "approve",
          args: [
            LENSVIEW_TIPPING_ADDRESS,
            (+amount * 10 ** tokenDecimals.POINTLESS).toString()
          ],
          account: from
        });
        break;
      case "USDT":
        tx = await writeContract(wagmiConfig, {
          abi: USDT_TOKEN_ABI,
          address: tokenAddress.USDT,
          functionName: "approve",
          args: [
            LENSVIEW_TIPPING_ADDRESS,
            (+amount * 10 ** tokenDecimals.USDT).toString()
          ],
          account: from
        });
        break;
    }
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

export const tipTokenWriteContractUtil = async (
  token: keyof typeof tokenAddress,
  recipient: `0x${string}`,
  amount: string,
  fromProfileId: number | null,
  toProfileId: number,
  publicationId: number,
  from: `0x${string}`
) => {
  try {
    const tokenContractAddress: `0x${string}` = tokenAddress[token];
    const tx = await writeContract(wagmiConfig, {
      abi: LENSVIEW_TIPPING_CONTRACT_ABI,
      address: LENSVIEW_TIPPING_ADDRESS,
      functionName: "tip",
      args: [
        tokenContractAddress,
        recipient,
        (+amount * 10 ** tokenDecimals[token]).toString(),
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
  } catch (error) {
    console.log("error while sending tip", error);
    return {
      success: false,
      result: null,
      error: error
    };
  }
};
