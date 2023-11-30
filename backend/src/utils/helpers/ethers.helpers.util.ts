import type { TypedDataDomain } from "@ethersproject/abstract-signer";
import { omit } from "./helpers.helpers.util";
import { signer } from "./get-alchemy-signer.helpers.util";
import { CreateOnchainPostEip712TypedDataTypes } from "../../gql/graphql";

/**
 * Returns the signer for authentication.
 *
 * @return {any} The signer for authentication.
 */
export const getSigner = () => {
  return signer;
};

export const signedTypeData = async (
  domain: TypedDataDomain,
  types: CreateOnchainPostEip712TypedDataTypes,
  value: Record<string, any>
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return await signer.signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};
