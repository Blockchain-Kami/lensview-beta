import type { TypedDataDomain } from "@ethersproject/abstract-signer";
import { omit } from "./helpers.helpers.util";
import { signer } from "./get-signer.helper.util";
import {
  CreateOnchainPostEip712TypedDataTypes,
  CreateOnchainCommentEip712TypedDataTypes
} from "../../gql/graphql";

/**
 * Returns the signer for authentication.
 *
 * @return {any} The signer for authentication.
 */
export const getSigner = () => {
  return signer;
};

export const signedTypeDataForPostHelperUtil = async (
  domain: TypedDataDomain,
  types: CreateOnchainPostEip712TypedDataTypes,
  value: Record<string, any>
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return await signer.signTypedData(
    omit(domain, "__typename"),
    // @ts-ignore
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};

export const signedTypeDataForCommentHelperUtil = async (
  domain: TypedDataDomain,
  types: CreateOnchainCommentEip712TypedDataTypes,
  value: Record<string, any>
) => {
  const signer = getSigner();
  // remove the __typedname from the signature!
  return await signer.signTypedData(
    omit(domain, "__typename"),
    // @ts-ignore
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};
