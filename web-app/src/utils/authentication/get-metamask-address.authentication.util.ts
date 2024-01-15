import { cross, wallet } from "../app-icon.util";
import { addressUserStore } from "../../stores/user/address.user.store";
import stringifyNotificationObjectWithFunctionUtil from "../stringify-notification-object-with-function.util";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
const { VITE_CHAIN_ID } = import.meta.env;
const { VITE_CHAIN_NAME } = import.meta.env;
const { VITE_RPC_URL } = import.meta.env;
const { VITE_BLOCK_EXPLORER_URL } = import.meta.env;

const getMetamaskAddressAuthenticationUtil = async (
  isStartUpSignedInCheck: boolean
) => {
  if (typeof window.ethereum === "undefined") {
    if (isStartUpSignedInCheck) {
      isLoggedInUserStore.setLoggedInStatus(false);
      return;
    }

    const errorDetails = {
      position: "top-right",
      heading: "Please install Metamask",
      description:
        "Please install metamask to post as yourself, you can still view others posts and post anonymously",
      type: wallet,
      removeAfter: 15000,
      ctaBtnName: "Install Metamask",
      ctaFunction: () => {
        window.open("https://metamask.io/", "_blank");
      }
    };

    throw new Error(stringifyNotificationObjectWithFunctionUtil(errorDetails));
  } else {
    /* this allows the user to connect their wallet */
    try {
      const isUserSwitchedToCorrectChain = await switchUserToCorrectChain(
        isStartUpSignedInCheck
      );
      console.log("isUserSwitchedToCorrectChain", isUserSwitchedToCorrectChain);

      if (isStartUpSignedInCheck && !isUserSwitchedToCorrectChain) {
        isLoggedInUserStore.setLoggedInStatus(false);
        return;
      }

      const addressesWithoutMetaMaskPrompt = await window.ethereum.request({
        method: "eth_accounts"
      });

      if (addressesWithoutMetaMaskPrompt.length > 0) {
        addressUserStore.setUserAddress(addressesWithoutMetaMaskPrompt[0]);
        console.log(
          "addressesWithoutMetaMaskPrompt : " +
            JSON.stringify(addressesWithoutMetaMaskPrompt)
        );
        return;
      }

      if (isStartUpSignedInCheck && addressesWithoutMetaMaskPrompt.length === 0)
        return;

      const addressesWithMetaMaskPrompt = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      if (addressesWithMetaMaskPrompt.length) {
        addressUserStore.setUserAddress(addressesWithMetaMaskPrompt[0]);
      }

      console.log("Account : " + JSON.stringify(addressesWithMetaMaskPrompt));
    } catch (error) {
      console.log(error);

      const errorDetails = {
        position: "top-right",
        heading: "Error while connecting wallet",
        description: "Please try again to connect",
        type: cross,
        removeAfter: 3000
      };

      throw new Error(JSON.stringify(errorDetails));
    }
  }
};

export default getMetamaskAddressAuthenticationUtil;

const switchUserToCorrectChain = async (isStartUpSignedInCheck: boolean) => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  console.log("Chain Id : " + chainId);

  const chainIDToBeUsed = VITE_CHAIN_ID;

  if (chainId !== chainIDToBeUsed) {
    if (isStartUpSignedInCheck) {
      isLoggedInUserStore.setLoggedInStatus(false);
      return false;
    }

    const chainParams = {
      chainId: VITE_CHAIN_ID,
      chainName: VITE_CHAIN_NAME,
      rpcUrls: [VITE_RPC_URL],
      blockExplorerUrls: [VITE_BLOCK_EXPLORER_URL],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      }
    };

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: chainIDToBeUsed
          }
        ]
      });
    } catch (switchError) {
      console.log("switchError", switchError);
      if ((switchError as any).code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainParams]
          });
        } catch (addError) {
          console.log("Error adding chain", addError);
          throw new Error(addError as string);
        }
      } else {
        console.log("Error switching chain", switchError);
        throw new Error(switchError as string);
      }
    }
  } else {
    return true;
  }
};
