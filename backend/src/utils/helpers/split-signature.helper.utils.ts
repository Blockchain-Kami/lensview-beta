import { Signature } from "ethers";

export const splitSignatureHelperUtil = (signature: string) => {
  return Signature.from(signature);
};
