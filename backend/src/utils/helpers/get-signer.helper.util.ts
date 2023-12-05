import { ethers } from "ethers";
import { ALCHEMY_API_KEY, PRIVATE_KEY } from "../../config/env.config";

const provider = new ethers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

// Initialize signer using private key and provider
export const signer = new ethers.Wallet(PRIVATE_KEY, provider);
