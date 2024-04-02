import type { TypedDataDomain } from "@ethersproject/abstract-signer";
import { omit } from "./helpers.helpers.util";
import { signer } from "./get-signer.helper.util";
import { logger } from "../../log/log-manager.log";
import {
  CreateOnchainPostEip712TypedDataTypes,
  CreateOnchainCommentEip712TypedDataTypes,
  CreateMomokaPostEip712TypedDataTypes,
  CreateMomokaCommentEip712TypedDataTypes,
  CreateChangeProfileManagersEip712TypedDataTypes
} from "../../gql/graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";

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
  types:
    | CreateOnchainPostEip712TypedDataTypes
    | CreateMomokaPostEip712TypedDataTypes,
  value: Record<string, any>
) => {
  try {
    logger.info(
      "sign-type-data.helper.util.ts: signedTypeDataForPostHelperUtil: Signing typed data."
    );
    const signer = getSigner();
    // remove the __typedname from the signature!
    return await signer.signTypedData(
      omit(domain, "__typename"),
      // @ts-ignore
      omit(types, "__typename"),
      omit(value, "__typename")
    );
  } catch (error) {
    logger.error(
      "sign-type-data.helper.util.ts: signedTypeDataForPostHelperUtil: Failed to sign typed data. Error: " +
        error
    );
    throw new InternalServerError("Failed to sign typed data", 505);
  }
};

export const signedTypeDataForCommentHelperUtil = async (
  domain: TypedDataDomain,
  types:
    | CreateOnchainCommentEip712TypedDataTypes
    | CreateMomokaCommentEip712TypedDataTypes,
  value: Record<string, any>
) => {
  try {
    logger.info(
      "sign-type-data.helper.util.ts: signedTypeDataForCommentHelperUtil: Signing typed data."
    );
    const signer = getSigner();
    // remove the __typedname from the signature!
    return await signer.signTypedData(
      omit(domain, "__typename"),
      // @ts-ignore
      omit(types, "__typename"),
      omit(value, "__typename")
    );
  } catch (error) {
    logger.error(
      "sign-type-data.helper.util.ts: signedTypeDataForPostHelperUtil: Failed to sign typed data.Error: " +
        error
    );
    throw new InternalServerError("Failed to sign typed data", 505);
  }
};

export const signedTypeData = async (
  domain: TypedDataDomain,
  types: CreateChangeProfileManagersEip712TypedDataTypes,
  value: Record<string, any>
) => {
  try {
    logger.info(
      "sign-type-data.helper.util.ts: signedTypeData: Signing typed data."
    );
    const signer = getSigner();

    // remove the __typedname from the signature!
    return await signer.signTypedData(
      omit(domain, "__typename"),
      // @ts-ignore
      omit(types, "__typename"),
      omit(value, "__typename")
    );

    // console.log('typed data - domain', omit(domain, '__typename'));
    // console.log('typed data - types', omit(types, '__typename'));
    // console.log('typed data - value', omit(value, '__typename'));
    // console.log('typed data - signature', result);

    // const whoSigned = utils.verifyTypedData(
    //   omit(domain, '__typename'),
    //   omit(types, '__typename'),
    //   omit(value, '__typename'),
    //   result
    // );
    // console.log('who signed', whoSigned);
  } catch (error) {
    logger.error(
      "sign-type-data.helper.util.ts: signedTypeData: Failed to sign typed data. Error: " +
        error
    );
    throw new InternalServerError("Failed to sign typed data", 505);
  }
};
