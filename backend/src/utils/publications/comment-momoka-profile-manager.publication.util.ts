import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { MomokaCommentRequest } from "../../gql/graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import createMomokaCommentWithProfileManagerLensService from "../../services/lens/create-momoka-comment-with-profile-manager.lens.service";
import { logger } from "../../log/log-manager.log";
import { httpStatusCodes } from "../../config/app-constants.config";

export const commentMomokaProfileManagerPublicationUtil = async (
  parentPubId: string,
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  logger.info(
    "comment-momoka-profile-manager.publication.util.ts: commentMomokaProfileManagerPublicationUtil: Execution Started."
  );
  try {
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
        "comment-momoka-profile-manager.publication.util.ts: commentMomokaProfileManagerPublicationUtil: Execution ended. Failed to create comment on Momoka. Dispatcher Result: " +
          JSON.stringify(result)
      );
      return;
    }

    // TODO! Fix MOMOKA proof
    // const valid = await checkProofs(result.proof);
    // console.log('create DA post: valid', valid);
    logger.info(
      "comment-momoka-profile-manager.publication.util.ts: commentMomokaProfileManagerPublicationUtil: Execution ended. Successfully created comment on Momoka. Dispatcher Result: " +
        JSON.stringify(result)
    );
    return result;
  } catch (error) {
    logger.error(
      "comment-momoka-profile-manager.publication.util.ts: commentMomokaProfileManagerPublicationUtil: Failed to create comment on Momoka. Error: " +
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
  logger.info(
    "comment-momoka-profile-manager.publication.util.ts: createCommentOnMomoka: Execution Started."
  );
  try {
    const dispatcherResult =
      await createMomokaCommentWithProfileManagerLensService(
        createMomokaCommentRequest
      );

    if (dispatcherResult.__typename !== "CreateMomokaPublicationResult") {
      logger.error(
        "comment-momoka-profile-manager.publication.util.ts: createCommentOnMomoka: Execution ended. Failed to create comment on Momoka. Dispatcher Result: " +
          JSON.stringify(dispatcherResult)
      );
      return;
    }
    logger.info(
      "comment-momoka-profile-manager.publication.util.ts: createCommentOnMomoka: Execution ended. Successfully created comment on Momoka. Dispatcher Result: " +
        JSON.stringify(dispatcherResult)
    );
    return dispatcherResult;
  } catch (error) {
    logger.error(
      "comment-momoka-profile-manager.publication.util.ts: createCommentOnMomoka: Failed to create comment on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create comment on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
