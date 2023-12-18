import type {
  CreateOnchainPostBroadcastItemResult,
  OnchainPostRequest,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import { uploadIpfs } from "../ipfs.util";
import createOnchainPostTypedDataLensService from "../../services/lens/create-onchain-post-typed-data.lens.service";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import { signedTypeData } from "../ethers.util";
import { link } from "@lens-protocol/metadata";
import { MetadataAttributeType } from "@lens-protocol/metadata";
const { VITE_SOURCE_APP_ID } = import.meta.env;

const postOnChainPublicationUtil = async () => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas

  const metadata = link({
    locale: "en-US",
    tags: [
      "418f361f5cdc602c856956bf752c06a29c52e54a", //anonymousPubHash
      "8a5bcce8dd20adda1873b5e74a77268851b32500" //URLHash
    ],
    appId: VITE_SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: "testlenviewcode"
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: "testlenviewcode"
      },
      {
        key: "created on",
        type: MetadataAttributeType.STRING,
        value: Date.now().toString()
      }
    ],
    sharingLink: "https://scottspence.com/posts/use-urql-with-sveltekit",
    content: "Post by @testlenviewcode"
    //TODO: Check for below fields usage
    // attachments: [PublicationMetadataMediaVideo],
    // "encryptedWith": PublicationMetadataLitEncryption,
    // "hideFromFeed": true,
  });

  const ipfsResultUri = await uploadIpfs(JSON.stringify(metadata));
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

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("post onchain: signature", signature);

  // if (USE_GASLESS) {
  const broadcastResult = (await broadcastOnchainRequestLensService({
    id,
    signature
  })) as RelaySuccess | RelayError;

  await waitUntilBroadcastTransactionIsComplete(broadcastResult, "post");
  // } else {
  //   const { v, r, s } = splitSignature(signature);
  //
  //   const tx = await lensHub.postWithSig(
  //     {
  //       profileId: typedData.value.profileId,
  //       contentURI: typedData.value.contentURI,
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
  //     }
  //   );
  //   console.log("post onchain: tx hash", tx.hash);
  // }
};

export default postOnChainPublicationUtil;
