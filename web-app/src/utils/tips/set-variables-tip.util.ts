import {
  LENSVIEW_TIPPING_ADDRESS_BASE,
  LENSVIEW_TIPPING_ADDRESS_POLYGON,
  LENSVIEW_TIPPING_ADDRESS_LINEA,
  networks,
  baseTokenAddresses,
  baseTokenDecimals,
  baseTokenSymbol,
  polygonTokenAddresses,
  polygonTokenDecimals,
  polygonTokenSymbol,
  lineaTokenAddresses,
  lineaTokenDecimals,
  lineaTokenSymbol
} from "../../config/app-constants.config";
import {
  wagmiConfigBase,
  wagmiConfigLinea,
  wagmiConfigPolygon
} from "../web3modal.util";
import LENSVIEW_TIPPING_CONTRACT_POLYGON_ABI from "../../abis/contracts/polygon/lensview-tip.polygon.contract.abi.json";
import LENSVIEW_TIPPING_CONTRACT_BASE_ABI from "../../abis/contracts/base/lensview-tip.base.contract.abi.json";
import LENSVIEW_TIPPING_CONTRACT_LINEA_ABI from "../../abis/contracts/linea/lensview-tip.linea.contract.abi.json";
import BONSAI_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/bonsai-token.polygon.contract.abi.json";
import USDT_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/usdt-token.polygon.contract.abi.json";
import POINTLESS_TOKEN_POLYGON_ABI from "../../abis/contracts/polygon/pointless-token.polygon.contract.abi.json";
import BONSAI_TOKEN_BASE_ABI from "../../abis/contracts/base/bonsai-token.base.contract.abi.json";
import TOBY_TOKEN_BASE_ABI from "../../abis/contracts/base/toby-token.base.contract.abi.json";
import TOSHI_TOKEN_BASE_ABI from "../../abis/contracts/base/toshi-token.base.contract.abi.json";
import USDC_TOKEN_LINEA_ABI from "../../abis/contracts/linea/usdc-token.linea.contract.abi.json";
import USDT_TOKEN_LINEA_ABI from "../../abis/contracts/linea/usdt-token.linea.contract.abi.json";
import FOXY_TOKEN_LINEA_ABI from "../../abis/contracts/linea/foxy-token.linea.contract.abi.json";

export const setVariablesTipUtil = (
  selectedNetwork: keyof typeof networks,
  selectedToken:
    | keyof typeof baseTokenSymbol
    | keyof typeof polygonTokenSymbol
    | keyof typeof lineaTokenSymbol
) => {
  let tokenContractAddress: `0x${string}`,
    decimals,
    wagmiConfig,
    lensviewTippingAddress,
    LENSVIEW_TIPPING_CONTRACT_ABI,
    TOKEN_CONTRACT_ABI;
  if (selectedNetwork === networks.POLYGON) {
    tokenContractAddress =
      polygonTokenAddresses[
        selectedToken as keyof typeof polygonTokenAddresses
      ];
    decimals =
      polygonTokenDecimals[selectedToken as keyof typeof polygonTokenDecimals];
    switch (selectedToken) {
      case polygonTokenSymbol.BONSAI:
        TOKEN_CONTRACT_ABI = BONSAI_TOKEN_POLYGON_ABI;
        break;
      case polygonTokenSymbol.USDT:
        TOKEN_CONTRACT_ABI = USDT_TOKEN_POLYGON_ABI;
        break;
      case polygonTokenSymbol.POINTLESS:
        // @ts-ignore
        TOKEN_CONTRACT_ABI = POINTLESS_TOKEN_POLYGON_ABI;
        break;
      default:
        return null;
    }
    wagmiConfig = wagmiConfigPolygon;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_POLYGON;
    LENSVIEW_TIPPING_CONTRACT_ABI = LENSVIEW_TIPPING_CONTRACT_POLYGON_ABI;
  } else if (selectedNetwork === networks.BASE) {
    tokenContractAddress =
      baseTokenAddresses[selectedToken as keyof typeof baseTokenAddresses];
    decimals =
      baseTokenDecimals[selectedToken as keyof typeof baseTokenDecimals];
    switch (selectedToken) {
      case baseTokenSymbol.BONSAI:
        // @ts-ignore
        TOKEN_CONTRACT_ABI = BONSAI_TOKEN_BASE_ABI;
        break;
      case baseTokenSymbol.TOBY:
        TOKEN_CONTRACT_ABI = TOBY_TOKEN_BASE_ABI;
        break;
      case baseTokenSymbol.TOSHI:
        TOKEN_CONTRACT_ABI = TOSHI_TOKEN_BASE_ABI;
        break;
      default:
        return null;
    }
    wagmiConfig = wagmiConfigBase;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_BASE;
    LENSVIEW_TIPPING_CONTRACT_ABI = LENSVIEW_TIPPING_CONTRACT_BASE_ABI;
  } else {
    tokenContractAddress =
      lineaTokenAddresses[selectedToken as keyof typeof lineaTokenAddresses];
    decimals =
      lineaTokenDecimals[selectedToken as keyof typeof lineaTokenDecimals];
    switch (selectedToken) {
      case lineaTokenSymbol.USDC:
        // @ts-ignore
        TOKEN_CONTRACT_ABI = USDC_TOKEN_LINEA_ABI;
        break;
      case lineaTokenSymbol.USDT:
        TOKEN_CONTRACT_ABI = USDT_TOKEN_LINEA_ABI;
        break;
      case lineaTokenSymbol.FOXY:
        TOKEN_CONTRACT_ABI = FOXY_TOKEN_LINEA_ABI;
        break;
      default:
        return null;
    }
    wagmiConfig = wagmiConfigLinea;
    lensviewTippingAddress = LENSVIEW_TIPPING_ADDRESS_LINEA;
    LENSVIEW_TIPPING_CONTRACT_ABI = LENSVIEW_TIPPING_CONTRACT_LINEA_ABI;
  }
  return {
    tokenContractAddress,
    decimals,
    wagmiConfig,
    lensviewTippingAddress,
    TOKEN_CONTRACT_ABI,
    LENSVIEW_TIPPING_CONTRACT_ABI
  };
};
