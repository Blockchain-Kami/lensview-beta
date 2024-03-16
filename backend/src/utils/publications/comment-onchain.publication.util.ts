import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import type {
  CreateOnchainCommentBroadcastItemResult,
  OnchainCommentRequest
} from "../../gql/graphql";
import {
  APP_ADDRESS,
  LENS_HUB_CONTRACT_ADDRESS,
  USE_GASLESS
} from "../../config/env.config";
import { logger } from "../../log/log-manager.log";
import createOnchainCommentTypedDataLensService from "../../services/lens/create-onchain-comment-typed-data.lens.service";
import { signedTypeDataForCommentHelperUtil } from "../helpers/sign-type-data.helper.util";
import broadcastOnchainRequestService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastIsCompleteTransactionUtil } from "../transaction/wait-until-broadcast-is-complete.transaction.util";
import type { RelayError, RelaySuccess } from "../../gql/graphql";
import { getPolygonGasPriceHelperUtil } from "../helpers/get-polygon-gas-price.helper.utils";
import { splitSignatureHelperUtil } from "../helpers/split-signature.helper.utils";
import { createContractHelperUtils } from "../helpers/create-contract.helper.utils";
import LENS_HUB_ABI from "../../abis/lens-hub-contract.abi.json";
import { hasTransactionBeenIndexedIndexerUtil } from "../indexer/has-transaction-been-indexed.indexer.util";
import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { InternalServerError } from "../../errors/internal-server-error.error";

/**
 * Generates a comment on the blockchain publication with the given parent publication ID
 * and metadata. It uploads the metadata to IPFS, creates an on-chain comment request,
 * signs the request, and broadcasts it on-chain. If gasless execution is enabled,
 * it waits for the broadcast to complete without gas fees, otherwise it posts with gas.
 *
 * @param {string} parentPubId - The parent publication ID for the comment
 * @param {LinkMetadata | TextOnlyMetadata | ImageMetadata} metadata - The metadata
 * @return {void}
 */
const commentOnChainPublicationUtil = async (
  parentPubId: string,
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas
  logger.info(
    "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Execution Started."
  );
  logger.info(
    "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Input parameters: " +
      JSON.stringify({
        parentPubId,
        metadata
      })
  );
  try {
    const ipfsResultUri = await uploadToIPFSHelperUtil(
      JSON.stringify(metadata)
    );

    const request: OnchainCommentRequest = {
      commentOn: parentPubId,
      contentURI: ipfsResultUri
      // you can play around with open actions modules here all request
      // objects are in `publication-open-action-options.ts`
      // openActionModules: [simpleCollectAmountAndLimit(address)],
      //
      // you can play around with reference modules here
      // all request objects are in `publication-reference-module-options.ts`,
      // referenceModule: referenceModuleFollowOnly,
    };

    const { id, typedData } = (await createOnchainCommentTypedDataLensService(
      request
    )) as CreateOnchainCommentBroadcastItemResult;
    const signature = await signedTypeDataForCommentHelperUtil(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    if (USE_GASLESS) {
      logger.info(
        "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Gasless Execution Started."
      );
      const broadcastResult = (await broadcastOnchainRequestService({
        id,
        signature
      })) as RelaySuccess | RelayError;

      await waitUntilBroadcastIsCompleteTransactionUtil(
        broadcastResult,
        "Comment"
      );
    } else {
      logger.info(
        "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Posting with gas."
      );
      const polygonGasFee = await getPolygonGasPriceHelperUtil();
      const { v, r, s } = splitSignatureHelperUtil(signature);

      const lensHub = createContractHelperUtils(
        LENS_HUB_CONTRACT_ADDRESS,
        LENS_HUB_ABI
      );

      const tx = await lensHub.commentWithSig(
        {
          profileId: typedData.value.profileId,
          contentURI: typedData.value.contentURI,
          pointedProfileId: typedData.value.pointedProfileId,
          pointedPubId: typedData.value.pointedPubId,
          referrerProfileIds: typedData.value.referrerProfileIds,
          referrerPubIds: typedData.value.referrerPubIds,
          referenceModuleData: typedData.value.referenceModuleData,
          actionModules: typedData.value.actionModules,
          actionModulesInitDatas: typedData.value.actionModulesInitDatas,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData
        },
        {
          signer: APP_ADDRESS,
          v,
          r,
          s,
          deadline: typedData.value.deadline
        },
        {
          maxFeePerGas: polygonGasFee.maxFeePerGas,
          maxPriorityFeePerGas: polygonGasFee.maxPriorityFeePerGas
        }
      );
      await hasTransactionBeenIndexedIndexerUtil(
        {
          forTxHash: tx.hash
        },
        Date.now()
      );
      logger.info(
        "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Execution End. Transaction Hash: " +
          tx.hash
      );
    }
  } catch (error) {
    logger.error(
      "comment-onchain.publication.util.ts: commentOnChainPublicationUtil: Error in Execution: " +
        error
    );
    throw new InternalServerError("Failed to POST COMMENT to LensView", 500);
  }
};

export default commentOnChainPublicationUtil;
