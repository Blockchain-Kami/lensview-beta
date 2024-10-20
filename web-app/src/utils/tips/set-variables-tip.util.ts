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
import LENSVIEW_TIPPING_CONTRACT_POLYGON_ABI from "../../abis/contracts/polygon/lensview-tip.polygon.contract.abi.json";
import LENSVIEW_TIPPING_CONTRACT_BASE_ABI from "../../abis/contracts/base/lensview-tip.base.contract.abi.json";

export const setVariablesTipUtil = (
  selectedNetwork: keyof typeof networks,
  selectedToken: keyof typeof baseTokenSymbol | keyof typeof polygonTokenSymbol
) => {
  let tokenContractAddress: `0x${string}`,
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
      polygonTokenDecimals[selectedToken as keyof typeof polygonTokenDecimals];
    wagmiConfig = wagmiConfigPolygon;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_POLYGON;
    ABI = LENSVIEW_TIPPING_CONTRACT_POLYGON_ABI;
  } else {
    tokenContractAddress =
      baseTokenAddresses[selectedToken as keyof typeof baseTokenAddresses];
    decimals =
      baseTokenDecimals[selectedToken as keyof typeof baseTokenDecimals];
    wagmiConfig = wagmiConfigBase;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_BASE;
    ABI = LENSVIEW_TIPPING_CONTRACT_BASE_ABI;
  }
  return {
    tokenContractAddress,
    decimals,
    wagmiConfig,
    lensviewTippingAddress,
    ABI
  };
};
