import createMomokaCommentWithLensManagerLensService from "../../services/lens/create-momoka-comment-with-lens-manager.lens.service";
import type { MomokaCommentRequest } from "../../gql/graphql";
import { profileUserStore } from "../../stores/user/profile.user.store";
import { MetadataAttributeType, textOnly } from "@lens-protocol/metadata";
import { uploadIpfs } from "../ipfs.util";
const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_USER_PUB } = import.meta.env;

const createCommentOnMomoka = async (
  createMomokaCommentRequest: MomokaCommentRequest
) => {
  const dispatcherResult = await createMomokaCommentWithLensManagerLensService(
    createMomokaCommentRequest
  );

  console.log(
    "create momoka comment via lens-manager: createMomokaCommentWithLensManager",
    dispatcherResult
  );

  return dispatcherResult;
};

export const commentOnMomokaLensProfileManagerPublicationUtil = async (
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

  console.log("comment momoka: ipfs result", ipfsResultUri);

  const request: MomokaCommentRequest = {
    contentURI: ipfsResultUri,
    commentOn: parentPubId
  };

  const result = await createCommentOnMomoka(request);
  console.log("create momoka comment created", result);

  if (result?.__typename !== "CreateMomokaPublicationResult") {
    console.error("create momoka comment failed", result);
    return;
  }

  // TODO! Fix MOMOKA proof
  // const valid = await checkProofs(result.proof);
  // console.log('create DA post: valid', valid);

  return result;
};

export default commentOnMomokaLensProfileManagerPublicationUtil;
