import createMomokaCommentTypedDataLensService from "../../services/lens/create-momoka-comment-typed-data.lens.service";
import type {
  CreateMomokaCommentBroadcastItemResult,
  MomokaCommentRequest
} from "../../gql/graphql";
import { signedTypeData } from "../ethers.util";
import broadcastOnMomokaRequestLensService from "../../services/lens/broadcast-on-Momoka-request.lens.service";
import { uploadIpfs } from "../ipfs.util";
import { profileUserStore } from "../../stores/user/profile.user.store";
import { MetadataAttributeType, textOnly } from "@lens-protocol/metadata";

const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_USER_PUB } = import.meta.env;

const signCreateMomokaCommentTypedData = async (
  request: MomokaCommentRequest
) => {
  const result = (await createMomokaCommentTypedDataLensService(
    request
  )) as CreateMomokaCommentBroadcastItemResult;
  // console.log("create momoka comment: createMomokaCommentTypedData", result);

  const typedData = result.typedData;
  // console.log(
  //   "create momoka comment: typedData",
  //   JSON.stringify(typedData, null, 2)
  // );

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  // console.log("create momoka comment: signature", signature);

  return { result, signature };
};

const createCommentOnMomoka = async (
  momokaCommentRequest: MomokaCommentRequest
) => {
  const signedResult = await signCreateMomokaCommentTypedData(
    momokaCommentRequest
  );
  // console.log(
  //   "create momoka comment via broadcast: signedResult",
  //   signedResult
  // );

  const broadcastResult = await broadcastOnMomokaRequestLensService({
    id: signedResult.result.id,
    signature: signedResult.signature
  });

  if (broadcastResult?.__typename !== "CreateMomokaPublicationResult") {
    console.error(
      "create momoka comment via broadcast: failed",
      broadcastResult
    );
    throw new Error("create momoka comment via broadcast: failed");
  }

  // console.log(
  //   "create momoka comment via broadcast: broadcastResult",
  //   broadcastResult
  // );

  return broadcastResult;
};

export const commentOnMomokaPublicationUtil = async (
  parentPubId: string,
  comment: string,
  postOrCommentHash: string,
  mainPostUrl: string,
  mainPostImageUrl: string
) => {
  let handle = "";
  const unsub = profileUserStore.subscribe((_profile) => {
    if (_profile === null) return;
    handle = _profile?.handle?.fullHandle;
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

  const request: MomokaCommentRequest = {
    contentURI: ipfsResultUri,
    commentOn: parentPubId
  };

  // hard coded to make the code example clearer
  const result = await createCommentOnMomoka(request);
  // console.log("create momoka comment created", result);

  if (result.__typename !== "CreateMomokaPublicationResult") {
    console.error("create momoka comment failed", result);
    return;
  }

  // TODO!: Check momoka proof
  // const valid = await checkProofs(result.proof);
  // console.log('create momoka comment: valid', valid);

  return result;
};

export default commentOnMomokaPublicationUtil;
