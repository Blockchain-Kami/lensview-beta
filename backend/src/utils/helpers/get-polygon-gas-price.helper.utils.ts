import { InternalServerError } from "../../errors/internal-server-error.error.js";

import { polygonGasPriceService } from "../../services/polygon-gas-price.service.js";

import { logger } from "../../log/log-manager.log.js";

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
      "get-polygon-gas-price.helper.utils.ts: getPolygonGasPriceHelperUtil: Execution Completed."
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
