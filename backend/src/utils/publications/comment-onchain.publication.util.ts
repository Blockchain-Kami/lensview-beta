import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import type {
  CreateOnchainCommentBroadcastItemResult,
  OnchainCommentRequest
} from "../../gql/graphql";
import {
  APP_ADDRESS,
  PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
  USE_GASLESS
} from "../../config/env.config";
import createOnchainCommentTypedDataService from "../../services/lens/create-onchain-comment-typed-data.lens.service";
import { signedTypeDataForCommentHelperUtil } from "../helpers/sign-type-data.helper.util";
import broadcastOnchainRequestService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastIsCompleteTransactionUtil } from "../transaction/wait-until-broadcast-is-complete.transaction.util";
import type { RelayError, RelaySuccess } from "../../gql/graphql";
import { getPolygonGasPriceHelperUtil } from "../helpers/get-polygon-gas-price.helper.utils";
import { splitSignatureHelperUtil } from "../helpers/split-signature.helper.utils";
import { createContractHelperUtils } from "../helpers/create-contract.helper.utils";
import LENS_HUB_ABI from "../../abis/lens-hub-contract.abi.json";
import { hasTransactionBeenIndexedIndexerUtil } from "../indexer/has-transaction-been-indexed.indexer.util";

const commentOnChainPublicationUtil = async (
  parentPubId: string,
  metadata: any
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas

  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));
  console.log("post onchain: ipfs result uri", ipfsResultUri);

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

  const { id, typedData } = (await createOnchainCommentTypedDataService(
    request
  )) as CreateOnchainCommentBroadcastItemResult;
  console.log("comment onchain: result", { id, typedData });

  console.log("comment onchain: typedData", typedData);

  const signature = await signedTypeDataForCommentHelperUtil(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("comment onchain: signature", signature);

  if (USE_GASLESS) {
    const broadcastResult = (await broadcastOnchainRequestService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastIsCompleteTransactionUtil(
      broadcastResult,
      "Comment"
    );
  } else {
    const polygonGasFee = await getPolygonGasPriceHelperUtil();
    const { v, r, s } = splitSignatureHelperUtil(signature);

    const lensHub = createContractHelperUtils(
      PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
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
    console.log("post onchain: tx hash", tx.hash);
  }
};

export default commentOnChainPublicationUtil;
