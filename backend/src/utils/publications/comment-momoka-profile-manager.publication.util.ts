import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import { MomokaCommentRequest } from "../../gql/graphql";
import createMomokaCommentWithProfileManagerLensService from "../../services/lens/create-momoka-comment-with-profile-manager.lens.service";

export const commentMomokaProfileManagerPublicationUtil = async (
  parentPubId: string,
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));

  console.log("comment momoka: ipfs result", ipfsResultUri);

  const request: MomokaCommentRequest = {
    contentURI: ipfsResultUri,
    commentOn: parentPubId
    // you can play around with open actions modules here all request
    // objects are in `publication-open-action-options.ts`
    // openActionModules: [simpleCollectAmountAndLimit(address)],
    //
    // you can play around with reference modules here
    // all request objects are in `publication-reference-module-options.ts`,
    // referenceModule: referenceModuleFollowOnly,
  };

  const result = await createCommentOnMomoka(request);
  console.log("create momoka comment created", result);

  if (result.__typename !== "CreateMomokaPublicationResult") {
    console.error("create momoka comment failed", result);
    return;
  }

  // TODO! Fix MOMOKA proof
  // const valid = await checkProofs(result.proof);
  // console.log('create DA post: valid', valid);

  return result;
};

const createCommentOnMomoka = async (
  createMomokaCommentRequest: MomokaCommentRequest
) => {
  const dispatcherResult =
    await createMomokaCommentWithProfileManagerLensService(
      createMomokaCommentRequest
    );

  if (dispatcherResult.__typename !== "CreateMomokaPublicationResult") {
    console.error("create momoka comment failed", dispatcherResult);
    return;
  }
  return dispatcherResult;
};
