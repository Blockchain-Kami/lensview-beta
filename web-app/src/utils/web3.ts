import { ethers } from "ethers";

export const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
};
