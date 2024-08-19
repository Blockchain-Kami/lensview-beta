// main.ts

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";

import { polygon } from "viem/chains";
import { reconnect } from "@wagmi/core";
const { VITE_WALLET_CONNECT_PROJECT_ID } = import.meta.env;

// Your WalletConnect Cloud project ID

// Create a metadata object
const metadata = {
  name: "test-walletconnect",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

// Create wagmiConfig
const chains = [polygon] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: VITE_WALLET_CONNECT_PROJECT_ID,
  metadata,
  auth: {
    email: true,
    socials: ["google", "x", "github", "discord", "apple"],
    showWallets: true,
    walletFeatures: true
  },
  enableCoinbase: false,
  enableInjected: false
});
reconnect(wagmiConfig);

const web3Modal = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: VITE_WALLET_CONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  enableSwaps: true // Optional - false as default
});

export default web3Modal;
