import { type Address, createWalletClient, custom } from "viem";
import { chains } from "@lens-network/sdk/viem";
import "viem/window";

const walletClientUtil = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const [account] = (await window.ethereum!.request({
      method: "eth_requestAccounts"
    })) as [Address];

    return createWalletClient({
      account,
      chain: chains.testnet,
      transport: custom(window.ethereum!)
    });
  }

  throw new Error(
    "Ethereum not found, may be you are using walletconnect through mobile"
  );
};

export default walletClientUtil;
