import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";

import { MomokaPostRequest } from "../../gql/graphql.js";
import { InternalServerError } from "../../errors/internal-server-error.error.js";

import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util.js";
import createMomokaPostWithProfileManagerLensService from "../../services/lens/create-momoka-post-with-profile-manager.lens.service.js";

import { logger } from "../../log/log-manager.log.js";
import { httpStatusCodes } from "../../config/app-constants.config.js";

export const postMomokaProfileManagerPublicationUtil = async (
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  logger.info(
    "post-momoka-profile-manager.publication.util.ts: postMomokaProfileManagerPublicationUtil: Execution Started."
  );
  try {
    const ipfsResultUri = await uploadToIPFSHelperUtil(
      JSON.stringify(metadata)
    );
    const request: MomokaPostRequest = {
      contentURI: ipfsResultUri
    };

    const result = await createPostOnMomoka(request);

    if (result?.__typename !== "CreateMomokaPublicationResult") {
      logger.error(
        "post-momoka-profile-manager.publication.util.ts: postMomokaProfileManagerPublicationUtil: Execution ended. Failed to create comment on Momoka. Dispatcher Result: " +
          JSON.stringify(result)
      );
      return;
    }

    // TODO! Fix MOMOKA proof
    // const valid = await checkProofs(result.proof);
    // console.log('create DA post: valid', valid);
    logger.info(
      "post-momoka-profile-manager.publication.util.ts: postMomokaProfileManagerPublicationUtil: Execution ended. Successfully created comment on Momoka. Dispatcher Result: " +
        JSON.stringify(result)
    );
    return result;
  } catch (error) {
    logger.error(
      "post-momoka-profile-manager.publication.util.ts: postMomokaProfileManagerPublicationUtil: Failed to create comment on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create comment on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const createPostOnMomoka = async (
  createMomokaPostRequest: MomokaPostRequest
) => {
  logger.info(
    "post-momoka-profile-manager.publication.util.ts: createPostOnMomoka: Execution Started."
  );
  try {
    const dispatcherResult =
      await createMomokaPostWithProfileManagerLensService(
        createMomokaPostRequest
      );

    if (dispatcherResult.__typename !== "CreateMomokaPublicationResult") {
      logger.error(
        "post-momoka-profile-manager.publication.util.ts: createPostOnMomoka: Execution ended. Failed to create comment on Momoka. Dispatcher Result: " +
          JSON.stringify(dispatcherResult)
      );
      return;
    }
    logger.info(
      "post-momoka-profile-manager.publication.util.ts: createPostOnMomoka: Execution ended. Successfully created comment on Momoka. Dispatcher Result: " +
        JSON.stringify(dispatcherResult)
    );
    return dispatcherResult;
  } catch (error) {
    logger.error(
      "post-momoka-profile-manager.publication.util.ts: createPostOnMomoka: Failed to create comment on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create comment on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
