import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { reconnect } from "@wagmi/core";
const { VITE_WALLET_CONNECT_PROJECT_ID } = import.meta.env;
import { chains } from "@lens-network/sdk/viem";

// Create a metadata object
const metadata = {
  name: "LensView",
  description:
    "The omnipresent comment section to discuss, fact-check, and share your views about any web page",
  url: "https://lensview.io/", // origin must match your domain & subdomain
  icons: ["https://lensview.io/_app/immutable/assets/LensviewLogo.a9d110ce.svg"]
};

//TODO: Check Hey code for posting, follow etc through Walletconnect
// Create wagmiConfig
const chain = [chains.testnet] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains: chain,
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
