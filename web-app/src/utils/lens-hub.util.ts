import { ethers } from "ethers";
import LENSHUB from "../abis/lens-hub-contract-abi.json";
import { getSigner } from "./ethers.util";
const { VITE_LENS_HUB_CONTRACT_ADDRESS } = import.meta.env;

// lens contract info can all be found on the deployed
// contract address on polygon.

const lensHubUtil = new ethers.Contract(
  VITE_LENS_HUB_CONTRACT_ADDRESS,
  LENSHUB,
  getSigner()
);

export default lensHubUtil;
