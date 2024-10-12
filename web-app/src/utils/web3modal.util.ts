import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { polygon, base } from "viem/chains";
import { reconnect } from "@wagmi/core";
const { VITE_WALLET_CONNECT_PROJECT_ID } = import.meta.env;

// Create a metadata object
const metadata = {
  name: "LensView",
  description:
    "The omnipresent comment section to discuss, fact-check, and share your views about any web page",
  url: "https://lensview.io/", // origin must match your domain & subdomain
  icons: ["https://lensview.io/_app/immutable/assets/LensviewLogo.a9d110ce.svg"]
};

// Create wagmiConfig
const chains = [polygon, base] as const;
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

export const wagmiConfigBase = defaultWagmiConfig({
  chains: [base],
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

export const wagmiConfigPolygon = defaultWagmiConfig({
  chains: [polygon],
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

const web3ModalUtil = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: VITE_WALLET_CONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  enableSwaps: true // Optional - false as default
});

export default web3ModalUtil;
