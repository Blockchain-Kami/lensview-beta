import sponsoredTransactionUtil from "./sponsored-transaction.util";
import selfFundedTransactionUtil from "./self-funded-transaction.util";
import waitUntilTxCompleteUtil from "./wait-until-tx-complete.util";
import createCommentLensService from "../services/lens/create-comment.lens.service";
import { profileUserStore } from "../stores/user/profile.user.store";
import { textOnly, MetadataAttributeType } from "@lens-protocol/metadata";
import { uploadIpfs } from "./ipfs.util";

const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_USER_PUB } = import.meta.env;

const getContentUri = async (
  parentPubId: string,
  comment: string,
  postOrCommentHash: string,
  mainPostUrl: string,
  mainPostImageUrl: string
) => {
  let handle = "";
  const unsub = profileUserStore.subscribe((_profile) => {
    if (_profile === null) return;
    handle = _profile?.account?.username?.value;
  });
  unsub();

  const metadata = textOnly({
    locale: "en-US",
    tags: [
      VITE_USER_PUB, //userHash
      postOrCommentHash
    ],
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

  return await uploadIpfs(JSON.stringify(metadata));
};

const createCommentUtil = async (
  parentPubId: string,
  comment: string,
  postOrCommentHash: string,
  mainPostUrl: string,
  mainPostImageUrl: string
) => {
  const contentUri = await getContentUri(
    parentPubId,
    comment,
    postOrCommentHash,
    mainPostUrl,
    mainPostImageUrl
  );
  const response = await createCommentLensService(parentPubId, contentUri);

  let txHash;

  if (response?.__typename === "PostResponse") {
    console.log("hash : ", response?.hash);

    txHash = response?.hash;
  } else if (response?.__typename === "SponsoredTransactionRequest") {
    console.log("SponsoredTransactionRequest raw");

    txHash = await sponsoredTransactionUtil(response?.raw);
  } else if (response?.__typename === "SelfFundedTransactionRequest") {
    console.log("SelfFundedTransactionRequest raw");

    txHash = await selfFundedTransactionUtil(response?.raw);
  } else if (response?.__typename === "TransactionWillFail") {
    throw new Error(response?.reason);
  }

  return waitUntilTxCompleteUtil(txHash, Date.now());
};

export default createCommentUtil;
