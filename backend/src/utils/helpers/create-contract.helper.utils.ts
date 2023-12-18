import { ethers } from "ethers";
import { getSigner } from "./sign-type-data.helper.util";

export const createContractHelperUtils = (
  contractAddress: string,
  contractABI: any
) => {
  return new ethers.Contract(contractAddress, contractABI, getSigner());
};
