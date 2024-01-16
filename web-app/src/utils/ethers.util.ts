import type { TypedDataDomain } from "@ethersproject/abstract-signer";
import { ethers, utils } from "ethers";
import { omit } from "./helpers.util";

export const getSigner = () => {
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider.getSigner();
  }
};

export const signedTypeData = async (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>
) => {
  const signer = getSigner();

  // remove the __typedname from the signature!
  return await signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export const sendTx = (
  transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) => {
  const signer = getSigner();
  return signer.sendTransaction(transaction);
};

export const signText = (text: string) => {
  return getSigner().signMessage(text);
};
