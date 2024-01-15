import { polygonGasPriceService } from "../../services/polygon-gas-price.service";

// get max fees from gas station

export const getPolygonGasPriceHelperUtil = async () => {
  const gas = await polygonGasPriceService();
  const maxFeePerGas = gas.maxFeePerGas;
  const maxPriorityFeePerGas = gas.maxPriorityFeePerGas;
  console.log(maxFeePerGas, maxPriorityFeePerGas);
  return {
    maxFeePerGas,
    maxPriorityFeePerGas
  };
};
