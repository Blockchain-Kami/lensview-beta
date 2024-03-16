import { ethers, Interface, InterfaceAbi } from "ethers";
import { getSigner } from "./sign-type-data.helper.util";

export const createContractHelperUtils = (
  contractAddress: string,
  contractABI: Interface | InterfaceAbi
) => {
  return new ethers.Contract(contractAddress, contractABI, getSigner());
};
