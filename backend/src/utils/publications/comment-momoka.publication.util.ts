import type { MomokaCommentRequest } from "../../gql/graphql";
import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { broadcastOnMomokaRequestLensService } from "../../services/lens/broadcast-on-momoka-request.lens.service";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import { signedTypeDataForCommentHelperUtil } from "../helpers/sign-type-data.helper.util";
import createMomokaCommentTypedDataLensService from "../../services/lens/create-momoka-comment-typed-data.lens.service";

export const commentMomokaPublicationUtil = async (
  parentPubId: string,
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas
  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));

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
};

const createCommentOnMomoka = async (
  createMomokaCommentRequest: MomokaCommentRequest
) => {
  const result = await createMomokaCommentTypedDataLensService(
    createMomokaCommentRequest
  );
  const typedData = result.typedData;

  const signature = await signedTypeDataForCommentHelperUtil(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  const signedResult = { result, signature };

  const broadcastResult = await broadcastOnMomokaRequestLensService({
    id: signedResult.result.id,
    signature: signedResult.signature
  });

  if (broadcastResult.__typename !== "CreateMomokaPublicationResult") {
    console.error(
      "create momoka comment via broadcast: failed",
      broadcastResult
    );
    throw new Error("create momoka comment via broadcast: failed");
  }

  console.log(
    "create momoka comment via broadcast: broadcastResult",
    broadcastResult
  );

  return broadcastResult;
};
