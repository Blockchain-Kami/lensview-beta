import type {
  CreateOnchainPostBroadcastItemResult,
  OnchainPostRequest,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import {
  PUBLIC_USE_GASLESS,
  APP_ADDRESS,
  PUBLIC_LENS_HUB_CONTRACT_ADDRESS
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

const postOnChainPublicationUtil = async (metadata: any) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas

  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));
  console.log("post onchain: ipfs result uri", ipfsResultUri);

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
  console.log("post onchain: result", { id, typedData });

  console.log("post onchain: typedData", typedData);

  const signature = await signedTypeDataForPostHelperUtil(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("post onchain: signature", signature);

  if (PUBLIC_USE_GASLESS) {
    const broadcastResult = (await broadcastOnchainRequestService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastIsCompleteTransactionUtil(broadcastResult, "post");
  } else {
    console.log("post onchain: not using gasless");
    const { v, r, s } = splitSignatureHelperUtil(signature);

    const lensHub = createContractHelperUtils(
      PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
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
        maxFeePerGas: 7000000000,
        maxPriorityFeePerGas: 7000000000
      }
    );
    console.log("post onchain: tx", tx);
    await hasTransactionBeenIndexedIndexerUtil(
      {
        forTxHash: tx.hash
      },
      Date.now()
    );
    console.log("post onchain: tx hash", tx.hash);
  }
};

export default postOnChainPublicationUtil;
