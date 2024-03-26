import type {
  CreateOnchainPostBroadcastItemResult,
  OnchainPostRequest,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import {
  USE_GASLESS,
  APP_ADDRESS,
  LENS_HUB_CONTRACT_ADDRESS
} from "../../config/env.config";
import LENS_HUB_ABI from "../../abis/lens-hub-contract.abi.json";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import createOnchainPostTypedDataLensService from "../../services/lens/create-onchain-post-typed-data.lens.service";
import broadcastOnchainRequestService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastIsCompleteTransactionUtil } from "../transaction/wait-until-broadcast-is-complete.transaction.util";
import { signedTypeDataForPostHelperUtil } from "../helpers/sign-type-data.helper.util";
import { splitSignatureHelperUtil } from "../helpers/split-signature.helper.utils";
import { createContractHelperUtils } from "../helpers/create-contract.helper.utils";
import { hasTransactionBeenIndexedIndexerUtil } from "../indexer/has-transaction-been-indexed.indexer.util";
import { getPolygonGasPriceHelperUtil } from "../helpers/get-polygon-gas-price.helper.utils";
import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { logger } from "../../log/log-manager.log";

const postOnChainPublicationUtil = async (
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas
  logger.info(
    "post-onchain.publication.util.ts: postOnChainPublicationUtil: Execution Started."
  );
  logger.info(
    "post-onchain.publication.util.ts: postOnChainPublicationUtil: Input parameters: metadata" +
      JSON.stringify(metadata)
  );
  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));

  const request: OnchainPostRequest = {
    contentURI: ipfsResultUri
    // you can play around with open actions modules here all request
    // objects are in `publication-open-action-options.ts`
    // openActionModules: [simpleCollectAmountAndLimit(address)],
    //
    // you can play around with reference modules here
    // all request objects are in `publication-reference-module-options.ts`,
    // referenceModule: referenceModuleFollowOnly,
  };

  const { id, typedData } = (await createOnchainPostTypedDataLensService(
    request
  )) as CreateOnchainPostBroadcastItemResult;

  const signature = await signedTypeDataForPostHelperUtil(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  if (USE_GASLESS) {
    logger.info(
      "post-onchain.publication.util.ts: postOnChainPublicationUtil: Gasless Execution Started."
    );
    const broadcastResult = (await broadcastOnchainRequestService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastIsCompleteTransactionUtil(broadcastResult, "post");
  } else {
    logger.info(
      "post-onchain.publication.util.ts: postOnChainPublicationUtil: Posting with gas."
    );
    const polygonGasFee = await getPolygonGasPriceHelperUtil();
    const { v, r, s } = splitSignatureHelperUtil(signature);

    const lensHub = createContractHelperUtils(
      LENS_HUB_CONTRACT_ADDRESS,
      LENS_HUB_ABI
    );

    const tx = await lensHub.postWithSig(
      {
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
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
      "post-onchain.publication.util.ts: postOnChainPublicationUtil: Execution End. Transaction Hash: " +
        tx.hash
    );
  }
};

export default postOnChainPublicationUtil;
