import { InternalServerError } from "../../errors/internal-server-error.error.js";
import { PostsRequest, PostType } from "../../gql/graphql.js";

import { TAG_IMAGE_PUB } from "../../config/env.config.js";
import { logger } from "../../log/log-manager.log.js";
import { httpStatusCodes } from "../../config/app-constants.config.js";
import baseClient from "../../utils/helpers/base-client.helper.util.js";
import mainPostImageQueryGraphql from "../../graphql/queries/main-post-image.query.graphql.js";

export const getMainPublicationImageLensService = async (
  publicationID: string
) => {
  logger.info(
    "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: Execution Started"
  );
  try {
    // const publicationsWhere: PublicationsWhere = {
    //   commentOn: {
    //     id: publicationID
    //   },
    //   metadata: {
    //     tags: {
    //       oneOf: [TAG_IMAGE_PUB] //imagePub
    //     }
    //   }
    // };
    //
    // const publicationsRequest: PublicationsRequest = {
    //   limit: LimitType.Fifty,
    //   where: publicationsWhere
    // };

    const postsRequest: PostsRequest = {
      filter: {
        metadata: {
          tags: {
            all: [TAG_IMAGE_PUB, publicationID]
          }
        },
        postTypes: [PostType.Comment]
      }
    };

    logger.info(
      "get-main-publication-image.lens.service.ts: getMainPublicationImageLensService: publicationsRequest: " +
        JSON.stringify(postsRequest)
    );

    const result = await baseClient
      .query(mainPostImageQueryGraphql, {
        request: postsRequest
      })
      .toPromise();
    const imageComment = result?.data?.posts?.items[0];
    if (
      imageComment?.__typename === "Post" &&
      imageComment.metadata.__typename === "ImageMetadata"
    ) {
      if (imageComment.metadata?.image?.__typename === "MediaImage") {
        const uri = imageComment.metadata.image.item;
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
