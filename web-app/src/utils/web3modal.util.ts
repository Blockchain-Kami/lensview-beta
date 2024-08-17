// main.ts

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";

import { polygon } from "viem/chains";
import { reconnect } from "@wagmi/core";

// Your WalletConnect Cloud project ID
export const projectId = "f3a8f998349e6c371f43455f47000302";

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
  projectId,
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
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
});

export default web3Modal;
