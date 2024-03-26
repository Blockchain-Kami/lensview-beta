import { uploadIpfs } from "../ipfs.util";
import type {
  CreateOnchainCommentBroadcastItemResult,
  OnchainCommentRequest
} from "../../gql/graphql";
import createOnchainCommentTypedDataLensService from "../../services/lens/create-onchain-comment-typed-data.lens.service";
import { signedTypeData, splitSignature } from "../ethers.util";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type { RelayError, RelaySuccess } from "../../gql/graphql";
import { MetadataAttributeType, textOnly } from "@lens-protocol/metadata";
import { profileUserStore } from "../../stores/user/profile.user.store";
import lensHubUtil from "../lens-hub.util";
import { waitUntilComplete } from "../indexer/has-transaction-been-indexed.indexer.util";
const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_USE_GASLESS } = import.meta.env;
const { VITE_USER_PUB } = import.meta.env;

const commentOnChainPublicationUtil = async (
  parentPubId: string,
  comment: string,
  postOrCommentHash: string,
  mainPostUrl: string,
  mainPostImageUrl: string
) => {
  let handle = "";
  let address = "";
  const unsub = profileUserStore.subscribe((_profile) => {
    if (_profile === null) return;
    handle = _profile?.handle?.fullHandle;
    address = _profile?.ownedBy?.address;
  });
  unsub();

  const metadata = textOnly({
    locale: "en-US",
    tags: [
      VITE_USER_PUB, //userHash
      postOrCommentHash
    ],
    appId: VITE_SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: handle
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: VITE_SOURCE_APP_ID
      },
      {
        key: "createdOn",
        type: MetadataAttributeType.STRING,
        value: `${new Date().toJSON().slice(0, 10)}`
      },
      {
        key: "mainPostImageUrl",
        type: MetadataAttributeType.STRING,
        value: mainPostImageUrl
      },
      {
        key: "mainPostUrl",
        type: MetadataAttributeType.STRING,
        value: mainPostUrl
      },
      {
        key: "category",
        type: MetadataAttributeType.STRING,
        value: "LensView Beta User"
      }
    ],
    content: comment
    //TODO: Check for below fields usage
    // encryptedWith: PublicationMetadataLitEncryption,
    // hideFromFeed: false,
  });

  const ipfsResultUri = await uploadIpfs(JSON.stringify(metadata));
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

  if (VITE_USE_GASLESS === "true") {
    const broadcastResult = (await broadcastOnchainRequestLensService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastTransactionIsComplete(broadcastResult, "Comment");
  } else {
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHubUtil.commentWithSig(
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
        signer: address,
        v,
        r,
        s,
        deadline: typedData.value.deadline
      },
      { gasLimit: 10000000 }
    );
    console.log("comment onchain: tx hash", tx.hash);

    await waitUntilComplete({ forTxHash: tx.hash }, Date.now());
  }
};

export default commentOnChainPublicationUtil;
