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
import LENSVIEW_TIPPING_ABI_POLYGON from "../../abis/contracts/tip/lensview-tip.contract.polygon.abi.json";
import LENSVIEW_TIPPING_ABI_BASE from "../../abis/contracts/tip/lensview-tip.contract.base.abi.json";

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
    ABI = LENSVIEW_TIPPING_ABI_POLYGON;
  } else {
    tokenContractAddress =
      baseTokenAddresses[selectedToken as keyof typeof baseTokenAddresses];
    decimals =
      baseTokenDecimals[selectedToken as keyof typeof baseTokenDecimals];
    wagmiConfig = wagmiConfigBase;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_BASE;
    ABI = LENSVIEW_TIPPING_ABI_BASE;
  }
  return {
    tokenContractAddress,
    decimals,
    wagmiConfig,
    lensviewTippingAddress,
    ABI
  };
};
