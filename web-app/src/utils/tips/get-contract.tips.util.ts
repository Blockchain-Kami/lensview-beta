import { readContract } from "@wagmi/core";
import {
  baseTokenAddresses,
  baseTokenDecimals,
  baseTokenSymbol,
  networks,
  polygonTokenAddresses,
  polygonTokenDecimals,
  polygonTokenSymbol
} from "../../config/app-constants.config";
import { wagmiConfigBase, wagmiConfigPolygon } from "../web3modal.util";
import BONSAI_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/bonsai-token.polygon.contract.abi.json";
import BONSAI_TOKEN_BASE_ABI from "../../abis/contracts/base/bonsai-token.base.contract.abi.json";
import USDT_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/usdt-token.polygon.contract.abi.json";
import POINTLESS_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/pointless-token.polygon.contract.abi.json";
import TOBY_TOKEN_BASE_ABI from "../../abis/contracts/base/toby-token.base.contract.abi.json";
import TOSHI_TOKEN_BASE_ABI from "../../abis/contracts/base/toshi-token.base.contract.abi.json";
import { setVariablesTipUtil } from "./set-variables-tip.util";

export const hasAmountApprovedGetContractTipsUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken: keyof typeof baseTokenSymbol | keyof typeof polygonTokenSymbol,
  fromAddress: `0x${string}`,
  enteredAmount: number
) => {
  try {
    const variables = setVariablesTipUtil(selectedNetwork, selectedToken);
    const tokenContractAddress = variables.tokenContractAddress;
    const decimals = variables.decimals;
    const wagmiConfig = variables.wagmiConfig;
    const lensviewTippingAddress = variables.lensviewTippingAddress;
    const ABI = variables.ABI;

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
  } catch (error) {
    console.log("Error occurred while checking allowance", error);
    return false;
  }
};

export const getTokenBalanceGetContractTipsUtil = async (
  selectedNetwork: keyof typeof networks,
  selectedToken: keyof typeof baseTokenSymbol | keyof typeof polygonTokenSymbol,
  address: `0x${string}`
) => {
  try {
    let wagmiConfig, ABI, decimals, tokenContractAddress;
    if (selectedNetwork === networks.POLYGON) {
      tokenContractAddress =
        polygonTokenAddresses[
          selectedToken as keyof typeof polygonTokenAddresses
        ];
      decimals =
        polygonTokenDecimals[
          selectedToken as keyof typeof polygonTokenDecimals
        ];
      switch (selectedToken) {
        case polygonTokenSymbol.BONSAI:
          ABI = BONSAI_TOKEN_POLYGON_ABI;
          break;
        case polygonTokenSymbol.USDT:
          ABI = USDT_TOKEN_POLYGON_ABI;
          break;
        case polygonTokenSymbol.POINTLESS:
          // @ts-ignore
          ABI = POINTLESS_TOKEN_POLYGON_ABI;
          break;
        default:
          return 0;
      }
      wagmiConfig = wagmiConfigPolygon;
    } else {
      tokenContractAddress =
        baseTokenAddresses[selectedToken as keyof typeof baseTokenAddresses];
      decimals =
        baseTokenDecimals[selectedToken as keyof typeof baseTokenDecimals];
      switch (selectedToken) {
        case baseTokenSymbol.BONSAI:
          // @ts-ignore
          ABI = BONSAI_TOKEN_BASE_ABI;
          break;
        case baseTokenSymbol.TOBY:
          ABI = TOBY_TOKEN_BASE_ABI;
          break;
        case baseTokenSymbol.TOSHI:
          ABI = TOSHI_TOKEN_BASE_ABI;
          break;
        default:
          return 0;
      }
      wagmiConfig = wagmiConfigBase;
    }
    const tokenBalance = await readContract(wagmiConfig, {
      abi: ABI,
      address: tokenContractAddress,
      functionName: "balanceOf",
      args: [address],
      account: address
    });
    return Number(tokenBalance) / 10 ** decimals;
  } catch (error) {
    console.log("Failed to fetch balance. Error: ", error);
    return 0;
  }
};
