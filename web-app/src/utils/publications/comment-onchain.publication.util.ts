import { uploadIpfs } from "../ipfs.util";
import type {
  CreateOnchainCommentBroadcastItemResult,
  OnchainCommentRequest
} from "../../gql/graphql";
import createOnchainCommentTypedDataLensService from "../../services/lens/create-onchain-comment-typed-data.lens.service";
import { signedTypeData } from "../ethers.util";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type { RelayError, RelaySuccess } from "../../gql/graphql";
import { textOnly } from "@lens-protocol/metadata";

const commentOnChainPublicationUtil = async () => {
  const metadata = textOnly({
    content: "Comment GM!"
  });

  const ipfsResultUri = await uploadIpfs(JSON.stringify(metadata));
  console.log("post onchain: ipfs result uri", ipfsResultUri);

  const request: OnchainCommentRequest = {
    commentOn: "0x038e-0x0d",
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
  console.log("comment onchain: result", { id, typedData });

  console.log("comment onchain: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("comment onchain: signature", signature);

  // if (USE_GASLESS) {
  const broadcastResult = (await broadcastOnchainRequestLensService({
    id,
    signature
  })) as RelaySuccess | RelayError;

  await waitUntilBroadcastTransactionIsComplete(broadcastResult, "Comment");
  // } else {
  //   const { v, r, s } = splitSignature(signature);
  //
  //   const tx = await lensHub.commentWithSig(
  //     {
  //       profileId: typedData.value.profileId,
  //       contentURI: typedData.value.contentURI,
  //       pointedProfileId: typedData.value.pointedProfileId,
  //       pointedPubId: typedData.value.pointedPubId,
  //       referrerProfileIds: typedData.value.referrerProfileIds,
  //       referrerPubIds: typedData.value.referrerPubIds,
  //       referenceModuleData: typedData.value.referenceModuleData,
  //       actionModules: typedData.value.actionModules,
  //       actionModulesInitDatas: typedData.value.actionModulesInitDatas,
  //       referenceModule: typedData.value.referenceModule,
  //       referenceModuleInitData: typedData.value.referenceModuleInitData
  //     },
  //     {
  //       signer: address,
  //       v,
  //       r,
  //       s,
  //       deadline: typedData.value.deadline
  //     },
  //     { gasLimit: 10000000 }
  //   );
  //   console.log("comment onchain: tx hash", tx.hash);
  // }
};

export default commentOnChainPublicationUtil;
