import { InternalServerError } from "../../errors/internal-server-error.error";
import {
  LimitType,
  PublicationsRequest,
  PublicationsWhere
} from "../../gql/graphql";
import { TAG_IMAGE_PUB } from "../../config/env.config";
import { logger } from "../../log/log-manager.log";
import { httpStatusCodes } from "../../config/app-constants.config";
import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import getMainPublicationImageQueryGraphql from "../../graphql/queries/get-main-publication-image.query.graphql";

export const getMainPublicationImageLensService = async (
  publicationID: string
) => {
  logger.info(
    "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: Execution Started"
  );
  try {
    const publicationsWhere: PublicationsWhere = {
      commentOn: {
        id: publicationID
      },
      metadata: {
        tags: {
          oneOf: [TAG_IMAGE_PUB] //imagePub
        }
      }
    };

    const publicationsRequest: PublicationsRequest = {
      limit: LimitType.Fifty,
      where: publicationsWhere
    };

    logger.info(
      "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: publicationsRequest: " +
        JSON.stringify(publicationsRequest)
    );

    const result = await getBaseClientHelperUtil
      .query(getMainPublicationImageQueryGraphql, {
        request: publicationsRequest
      })
      .toPromise();
    const imageComment = result?.data?.publications?.items[0];
    if (
      imageComment?.__typename === "Comment" &&
      imageComment.metadata.__typename === "ImageMetadataV3"
    ) {
      if (
        imageComment.metadata?.asset?.image?.__typename ===
        "EncryptableImageSet"
      ) {
        const uri = imageComment.metadata.asset.image.optimized?.uri;
        logger.info(
          "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: uri fetched successfully: " +
            uri
        );
        return uri;
      }
    }
  } catch (error) {
    logger.error(
      "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: error in fetching URI: " +
        error
    );
    throw new InternalServerError(
      "Error Fetching Data From Lens API",
      httpStatusCodes.SERVER_TIMEOUT
    );
  }
};
