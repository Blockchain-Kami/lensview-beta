import { PolygonGasPriceResponseModel } from "../models/response/polygon-gas-price.response.model";
import axios from "axios";
import { ethers } from "ethers";
import { GASSTATION_URL } from "../config/env.config";
import { logger } from "../log/log-manager.log";

export const polygonGasPriceService = async () => {
  let data: PolygonGasPriceResponseModel;
  let maxFeePerGas = BigInt(50000000000); // fallback to 50 gwei
  let maxPriorityFeePerGas = BigInt(50000000000); // fallback to 50 gwei
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
