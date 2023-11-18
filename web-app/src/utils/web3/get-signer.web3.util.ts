import { ethers } from "ethers";

const getSignerWeb3Util = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
};

export default getSignerWeb3Util;
