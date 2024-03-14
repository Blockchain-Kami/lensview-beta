import { polygonGasPriceService } from "../../services/polygon-gas-price.service";
import { logger } from "../../log/log-manager.log";
import { InternalServerError } from "../../errors/internal-server-error.error";

// get max fees from gas station

export const getPolygonGasPriceHelperUtil = async () => {
  try {
    logger.info(
      "get-polygon-gas-price.helper.utils.ts: getPolygonGasPriceHelperUtil: Execution Started."
    );
    const gas = await polygonGasPriceService();
    const maxFeePerGas = gas.maxFeePerGas;
    const maxPriorityFeePerGas = gas.maxPriorityFeePerGas;
    logger.info(
      "get-polygon-gas-price.helper.utils.ts: getPolygonGasPriceHelperUtil: Execution Completed. Max Fee Per Gas: " +
        maxFeePerGas +
        ", Max Priority Fee Per Gas: " +
        maxPriorityFeePerGas
    );
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  } catch (error) {
    logger.error(
      "get-polygon-gas-price.helper.utils.ts: getPolygonGasPriceHelperUtil: Error in execution: " +
        error
    );
    throw new InternalServerError(
      "Error in fetching Polygon Network Gas Price",
      500
    );
  }
};
