import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import type {
  CreateOnchainCommentBroadcastItemResult,
  OnchainCommentRequest
} from "../../gql/graphql";
import createOnchainCommentTypedDataService from "../../services/lens/create-onchain-comment-typed-data.lens.service";
import { signedTypeDataForCommentHelperUtil } from "../helpers/sign-type-data.helper.util";
import broadcastOnchainRequestService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastIsCompleteTransactionUtil } from "../transaction/wait-until-broadcast-is-complete.transaction.util";
import type { RelayError, RelaySuccess } from "../../gql/graphql";

const commentOnChainPublicationUtil = async (
  parentPubId: string,
  metadata: any
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas

  // const metadata = image({
  //   locale: "en-US",
  //   tags: ["dd472d3370b389eb8399ea7c795ca9e76ff0d4d7"], //imagePub
  //   appId: PUBLIC_SOURCE_APP_ID,
  //   attributes: [
  //     {
  //       key: "creator",
  //       type: MetadataAttributeType.STRING,
  //       value: "testlenviewcode"
  //     },
  //     {
  //       key: "app",
  //       type: MetadataAttributeType.STRING,
  //       value: "testlenviewcode"
  //     },
  //     {
  //       key: "created on",
  //       type: MetadataAttributeType.STRING,
  //       value: Date.now().toString()
  //     }
  //   ],
  //   image: {
  //     item: "https://ik.imagekit.io/lens/media-snapshot/c5c43e9298b1eb8120e3963244387144132334c9aacddffc0b4900359642897c.jpg",
  //     type: MediaImageMimeType.PNG,
  //     altTag: "Me touching grass",
  //     license: MetadataLicenseType.CCO
  //   },
  //   attachments: [
  //     {
  //       item: "https://ik.imagekit.io/lens/media-snapshot/c5c43e9298b1eb8120e3963244387144132334c9aacddffc0b4900359642897c.jpg",
  //       type: MediaImageMimeType.PNG,
  //       altTag: "Me touching grass",
  //       license: MetadataLicenseType.CCO
  //     }
  //   ],
  //   title: "Post by @testlenviewcode",
  //   content: "Image link for the url: ${IPFSLink}"
  //   //TODO: Check for below fields usage
  //   // content: EncryptableMarkdown
  //   // attachments: [PublicationMetadataMediaVideo],
  //   // hideFromFeed: true,
  //   // encryptedWith: PublicationMetadataLitEncryption,
  // });

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

  // if (USE_GASLESS) {
  const broadcastResult = (await broadcastOnchainRequestService({
    id,
    signature
  })) as RelaySuccess | RelayError;

  await waitUntilBroadcastIsCompleteTransactionUtil(broadcastResult, "Comment");
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
