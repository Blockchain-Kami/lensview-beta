import { ethers } from "ethers";
import axios from "axios";
import { logger } from "../../log/logManager";

// get max fees from gas station

const fetchGas = async () => {
  logger.info(
    "utils/backend: fetch-gas.server.ts :: " + "EXECUTION START: fetchGas."
  );
  let maxFeePerGas = ethers.BigNumber.from(50000000000); // fallback to 50 gwei
  let maxPriorityFeePerGas = ethers.BigNumber.from(50000000000); // fallback to 50 gwei
  try {
    const { data } = await axios({
      method: "get",
      url: "https://gasstation-testnet.polygon.technology/v2"
    });
    maxFeePerGas = ethers.utils.parseUnits(
      Math.ceil(data.fast.maxFee) + "",
      "gwei"
    );
    maxPriorityFeePerGas = ethers.utils.parseUnits(
      Math.ceil(data.fast.maxPriorityFee) + "",
      "gwei"
    );
    logger.info(
      "utils/backend: fetch-gas.server.ts :: " +
        "EXECUTION END: fetchGas : Successfully Fetched Gas Price."
    );
    return [Number(maxFeePerGas._hex), Number(maxPriorityFeePerGas._hex)];
  } catch (error) {
    // ignore
    logger.error(
      "utils/backend: fetch-gas.server.ts :: " +
        "EXECUTION END: fetchGas : Failed to fetch gas, fallback to 50 Gwei."
    );
    return [Number(maxFeePerGas._hex), Number(maxPriorityFeePerGas._hex)];
  }
};

export const getGas = async () => {
  logger.info(
    "utils/backend: fetch-gas.server.ts :: " + "EXECUTION START: getGas"
  );
  const gas = await fetchGas();
  const maxFeePerGas = gas[0];
  const maxPriorityFeePerGas = gas[1];
  logger.info(
    "utils/backend: fetch-gas.server.ts :: " +
      "EXECUTION END: getGas :: " +
      "maxFeePerGas: " +
      maxFeePerGas +
      ", " +
      "maxPriorityFeePerGas: " +
      maxPriorityFeePerGas
  );
  return [maxFeePerGas, maxPriorityFeePerGas];
};
