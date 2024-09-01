import axios from "axios";
import { ethers } from "ethers";

import { PolygonGasPriceResponseModel } from "../models/response/polygon-gas-price.response.model.js";

import { GASSTATION_URL } from "../config/env.config.js";
import { logger } from "../log/log-manager.log.js";

export const polygonGasPriceService = async () => {
  let data: PolygonGasPriceResponseModel;
  let maxFeePerGas = BigInt(50000000000); // fallback to 50 gwei
  let maxPriorityFeePerGas = BigInt(50000000000); // fallback to 50 gwei
  logger.info(
    "polygon-gas-price.service.ts: polygonGasPriceService: Execution Started."
  );
  try {
    const response = await axios({
      method: "get",
      url: GASSTATION_URL
    });
    data = response.data;
    maxFeePerGas = ethers.parseUnits(Math.ceil(data.fast.maxFee) + "", "gwei");
    maxPriorityFeePerGas = ethers.parseUnits(
      Math.ceil(data.fast.maxPriorityFee) + "",
      "gwei"
    );
    logger.info(
      "polygon-gas-price.service.ts: polygonGasPriceService: Execution Completed. Max Fee Per Gas: " +
        Number(maxFeePerGas) +
        ", Max Priority Fee Per Gas: " +
        Number(maxPriorityFeePerGas)
    );
    return {
      maxFeePerGas: Number(maxFeePerGas),
      maxPriorityFeePerGas: Number(maxPriorityFeePerGas)
    };
  } catch (error) {
    logger.error(
      "polygon-gas-price.service.ts: polygonGasPriceService: Error in execution: " +
        error
    );
    return {
      maxFeePerGas: Number(maxFeePerGas),
      maxPriorityFeePerGas: Number(maxPriorityFeePerGas)
    };
  }
};
