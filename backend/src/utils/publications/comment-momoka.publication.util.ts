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
import { logger } from "../../log/log-manager.log";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { httpStatusCodes } from "../../config/app-constants.config";

export const commentMomokaPublicationUtil = async (
  parentPubId: string,
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  try {
    logger.info(
      "comment-momoka.publication.util.ts: commentMomokaPublicationUtil: Execution Started."
    );
    //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
    // devDependencies then keep it or go with schema approach that there in "api-examples" repo
    // https://docs.lens.xyz/docs/publication-metadata#json-schemas
    const ipfsResultUri = await uploadToIPFSHelperUtil(
      JSON.stringify(metadata)
    );

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

    if (result.__typename !== "CreateMomokaPublicationResult") {
      logger.error(
        "comment-momoka.publication.util.ts: commentMomokaPublicationUtil: Failed to create post on Momoka."
      );
      return;
    }
    logger.info(
      "comment-momoka.publication.util.ts: commentMomokaPublicationUtil: Execution ended."
    );
  } catch (error) {
    logger.error(
      "comment-momoka.publication.util.ts: commentMomokaPublicationUtil: Failed to create comment on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create comment on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const createCommentOnMomoka = async (
  createMomokaCommentRequest: MomokaCommentRequest
) => {
  try {
    logger.info(
      "comment-momoka.publication.util.ts: createCommentOnMomoka: Execution Started."
    );
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
      logger.error(
        "comment-momoka.publication.util.ts: createCommentOnMomoka: Execution ended. Failed to create post on Momoka."
      );
      throw new Error("create momoka comment via broadcast: failed");
    }
    logger.info(
      "comment-momoka.publication.util.ts: createCommentOnMomoka: Execution ended. Successfully created post on Momoka."
    );
    return broadcastResult;
  } catch (error) {
    logger.error(
      "comment-momoka.publication.util.ts: createCommentOnMomoka: Execution ended. Failed to create post on Momoka." +
        error
    );
    throw new InternalServerError(
      "Failed to create post on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
