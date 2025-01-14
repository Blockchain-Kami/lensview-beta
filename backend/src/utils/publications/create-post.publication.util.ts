import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";

import type { CreatePostRequest } from "../../gql/graphql.js";
import { InternalServerError } from "../../errors/internal-server-error.error.js";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util.js";

import { httpStatusCodes } from "../../config/app-constants.config.js";
import { logger } from "../../log/log-manager.log.js";
import createTextPostLensService from "../../services/lens/create-text-post.lens.service.js";
import { sendEip712Transaction } from "viem/zksync";
import walletClient from "../../config/viem.config.js";
import sponsoredTransactionDataHelperUtil from "../helpers/sponsored-transaction-data.helper.util.js";

export const createTextPostPublicationUtil = async (
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  try {
    logger.info(
      "create-post.publication.util.ts: createTextPostPublicationUtil: Execution Started."
    );
    //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
    // devDependencies then keep it or go with schema approach that there in "api-examples" repo
    // https://docs.lens.xyz/docs/publication-metadata#json-schemas
    const ipfsResultUri = await uploadToIPFSHelperUtil(
      JSON.stringify(metadata)
    );

    const request: CreatePostRequest = {
      contentUri: ipfsResultUri
      // you can play around with open actions modules here all request
      // objects are in `publication-open-action-options.ts`
      // openActionModules: [simpleCollectAmountAndLimit(address)],
      //
      // you can play around with reference modules here
      // all request objects are in `publication-reference-module-options.ts`,
      // referenceModule: referenceModuleFollowOnly,
    };
    return await createTextPost(request);
  } catch (error) {
    logger.error(
      "create-post.publication.util.ts: createTextPostPublicationUtil: Failed to create post on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create post on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const createTextPost = async (postRequest: CreatePostRequest) => {
  logger.info(
    "create-post.publication.publication.util.ts: createTextPost: Execution Started."
  );
  try {
    const transaction = await createTextPostLensService(postRequest);
    if (transaction.__typename === "SponsoredTransactionRequest") {
      const hash = await sendEip712Transaction(walletClient, {
        account: walletClient.account,
        ...sponsoredTransactionDataHelperUtil(transaction.raw)
      });
      console.log(hash);
      return;
    }
  } catch (error) {
    console.log(error);
    logger.error(
      "create-post.publication.publication.util.ts: createTextPost: Execution ended. Failed to create post. Error" +
        error
    );
    throw new InternalServerError(
      "Failed to create Post on Lens",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
