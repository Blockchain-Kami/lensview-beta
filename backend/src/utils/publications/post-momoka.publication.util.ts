import type { MomokaPostRequest } from "../../gql/graphql";
import {
  ImageMetadata,
  LinkMetadata,
  TextOnlyMetadata
} from "@lens-protocol/metadata";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { broadcastOnMomokaRequestLensService } from "../../services/lens/broadcast-on-momoka-request.lens.service";
import { uploadToIPFSHelperUtil } from "../helpers/upload-to-ipfs.helper.util";
import { signedTypeDataForPostHelperUtil } from "../helpers/sign-type-data.helper.util";
import createMomokaPostTypedDataLensService from "../../services/lens/create-momoka-post-typed-data.lens.service";
import { logger } from "../../log/log-manager.log";
import { httpStatusCodes } from "../../config/app-constants.config";

export const postMomokaPublicationUtil = async (
  metadata: LinkMetadata | TextOnlyMetadata | ImageMetadata
) => {
  try {
    logger.info(
      "post-momoka.publication.util.ts: postMomokaPublicationUtil: Execution Started."
    );
    //TODO: Check in production weather we need "@lens-protocol/metadata", if it works putting in
    // devDependencies then keep it or go with schema approach that there in "api-examples" repo
    // https://docs.lens.xyz/docs/publication-metadata#json-schemas
    const ipfsResultUri = await uploadToIPFSHelperUtil(
      JSON.stringify(metadata)
    );

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
      logger.error(
        "post-momoka.publication.util.ts: postMomokaPublicationUtil: Failed to create post on Momoka."
      );
      return;
    }
    logger.info(
      "post-momoka.publication.util.ts: postMomokaPublicationUtil: Execution ended."
    );
  } catch (error) {
    logger.error(
      "post-momoka.publication.util.ts: postMomokaPublicationUtil: Failed to create post on Momoka. Error: " +
        error
    );
    throw new InternalServerError(
      "Failed to create post on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const createPostOnMomoka = async (momokaPostRequest: MomokaPostRequest) => {
  logger.info(
    "post-momoka.publication.util.ts: createPostOnMomoka: Execution Started."
  );
  try {
    const result =
      await createMomokaPostTypedDataLensService(momokaPostRequest);
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
      logger.error(
        "post-momoka.publication.util.ts: createPostOnMomoka: Execution ended. Failed to create post on Momoka."
      );
      throw new Error("create momoka post via broadcast: failed");
    }
    logger.info(
      "post-momoka.publication.util.ts: createPostOnMomoka: Execution ended. Successfully created post on Momoka."
    );
    return broadcastResult;
  } catch (error) {
    logger.error(
      "post-momoka.publication.util.ts: createPostOnMomoka: Execution ended. Failed to create post on Momoka."
    );
    throw new InternalServerError(
      "Failed to create post on Momoka",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
