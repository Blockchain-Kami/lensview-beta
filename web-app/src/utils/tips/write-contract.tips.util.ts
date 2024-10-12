import { waitForTransactionReceipt } from "@wagmi/core";
import { writeContract } from "@wagmi/core";
import {
  baseTokenAddresses,
  baseTokenDecimals,
  baseTokenSymbol,
  LENSVIEW_TIPPING_ADDRESS_BASE,
  LENSVIEW_TIPPING_ADDRESS_POLYGON,
  networks,
  polygonTokenAddresses,
  polygonTokenDecimals,
  polygonTokenSymbol
} from "../../config/app-constants.config";
import { wagmiConfigBase, wagmiConfigPolygon } from "../web3modal.util";
import BONSAI_TOKEN_ABI_POLYGON from "../../abis/tokens/bonsai/bonsai.token.abi.polygon.json";
import BONSAI_TOKEN_ABI_BASE from "../../abis/tokens/bonsai/bonsai.token.abi.base.json";
import USDT_TOKEN_ABI from "../../abis/tokens/usdt/usdt.token.abi.json";
import POINTLESS_TOKEN_ABI from "../../abis/tokens/pointless/pointless.token.abi.json";
import TOBY_TOKEN_ABI from "../../abis/tokens/toby/toby.token.abi.json";
import { setVariablesTipUtil } from "./set-variables-tip.util";

export const approveTokenWriteContractUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken: keyof typeof polygonTokenSymbol | keyof typeof baseTokenSymbol,
  from: `0x${string}`,
  amount: number
) => {
  try {
    let tokenContractAddress,
      decimals,
      wagmiConfig,
      lensviewTippingAddress,
      ABI;
    if (selectedNetwork === networks.POLYGON) {
      tokenContractAddress =
        polygonTokenAddresses[
          selectedToken as keyof typeof polygonTokenAddresses
        ];
      decimals =
        polygonTokenDecimals[
          selectedToken as keyof typeof polygonTokenDecimals
        ];
      wagmiConfig = wagmiConfigPolygon;
      lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_POLYGON;

      switch (selectedToken) {
        case "BONSAI":
          ABI = BONSAI_TOKEN_ABI_POLYGON;
          break;
        case "POINTLESS":
          // @ts-ignore
          ABI = POINTLESS_TOKEN_ABI;
          break;
        case "USDT":
          ABI = USDT_TOKEN_ABI;
          break;
        default:
          throw new Error("Invalid Token Received");
      }
    } else {
      tokenContractAddress =
        baseTokenAddresses[selectedToken as keyof typeof baseTokenAddresses];
      decimals =
        baseTokenDecimals[selectedToken as keyof typeof baseTokenDecimals];
      wagmiConfig = wagmiConfigBase;
      lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_BASE;

      switch (selectedToken) {
        case "BONSAI":
          // @ts-ignore
          ABI = BONSAI_TOKEN_ABI_BASE;
          break;
        case "POINTLESS":
          // @ts-ignore
          ABI = POINTLESS_TOKEN_ABI;
          break;
        case "TOBY":
          ABI = TOBY_TOKEN_ABI;
          break;
        default:
          throw new Error("Invalid Token Received");
      }
    }
    const tx = await writeContract(wagmiConfig, {
      abi: ABI,
      address: tokenContractAddress,
      functionName: "approve",
      args: [lensviewTippingAddress, (+amount * 10 ** decimals).toString()],
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

export const tipTokenWriteContractUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken: keyof typeof baseTokenSymbol | keyof typeof polygonTokenSymbol,
  recipient: `0x${string}`,
  amount: string,
  fromProfileId: number | null,
  toProfileId: number,
  publicationId: number,
  from: `0x${string}`
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    const tokenContractAddress = variables.tokenContractAddress;
    const decimals = variables.decimals;
    const wagmiConfig = variables.wagmiConfig;
    const lensviewTippingAddress = variables.lensviewTippingAddress;
    const ABI = variables.ABI;

    const tx = await writeContract(wagmiConfig, {
      abi: ABI,
      address: lensviewTippingAddress,
      functionName: "tip",
      args: [
        tokenContractAddress,
        recipient,
        (+amount * 10 ** decimals).toString(),
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
