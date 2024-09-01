import { ethers } from "ethers";

import {
  ALCHEMY_API_KEY,
  PRIVATE_KEY,
  NETWORK
} from "../../config/env.config.js";

const provider = new ethers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY);

// Initialize signer using private key and provider
export const signer = new ethers.Wallet(PRIVATE_KEY, provider);
