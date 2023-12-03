import { ethers } from "ethers";
import { API_KEY, PRIVATE_KEY } from "../../config/env.config";

const provider = new ethers.AlchemyProvider("maticmum", API_KEY);

// Initialize signer using private key and provider
export const signer = new ethers.Wallet(PRIVATE_KEY, provider);
