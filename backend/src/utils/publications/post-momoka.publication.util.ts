import type { MomokaPostRequest } from "../../gql/graphql";
import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { broadcastOnMomokaRequestLensService } from "../../services/lens/broadcast-on-momoka-request.lens.service";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import { signedTypeDataForPostHelperUtil } from "../helpers/sign-type-data.helper.util";
import createMomokaPostTypedDataLensService from "../../services/lens/create-momoka-post-typed-data.lens.service";

export const postMomokaPublicationUtil = async (
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
  // devDependencies then keep it or go with schema approach that there in "api-examples" repo
  // https://docs.lens.xyz/docs/publication-metadata#json-schemas
  const ipfsResultUri = await uploadToIPFSHelperUtil(JSON.stringify(metadata));

  const request: MomokaPostRequest = {
    contentURI: ipfsResultUri
    // you can play around with open actions modules here all request
    // objects are in `publication-open-action-options.ts`
    // openActionModules: [simpleCollectAmountAndLimit(address)],
    //
    // you can play around with reference modules here
    // all request objects are in `publication-reference-module-options.ts`,
    // referenceModule: referenceModuleFollowOnly,
  };
  const result = await createPostOnMomoka(request);
  if (result.__typename !== "CreateMomokaPublicationResult") {
    console.error("create momoka post failed", result);
    return;
  }
};

const createPostOnMomoka = async (momokaPostRequest: MomokaPostRequest) => {
  const result = await createMomokaPostTypedDataLensService(momokaPostRequest);
  const typedData = result.typedData;

  const signature = await signedTypeDataForPostHelperUtil(
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
    console.error("create momoka post via broadcast: failed", broadcastResult);
    throw new Error("create momoka post via broadcast: failed");
  }

  console.log(
    "create momoka post via broadcast: broadcastResult",
    broadcastResult
  );

  return broadcastResult;
};
