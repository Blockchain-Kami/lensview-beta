import { createWalletClient, Hex, http } from "viem";
import { chains } from "@lens-network/sdk/viem";
import { APP_ADDRESS } from "./env.config.js";

const account = APP_ADDRESS as Hex;

export const walletClient = createWalletClient({
  account,
  chain: chains.testnet,
  transport: http()
});

export default walletClient;
