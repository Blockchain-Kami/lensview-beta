import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import getMainPublicationImageQueryGraphql from "../../graphql/queries/get-main-publication-image.query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
import {
  LimitType,
  PublicationsRequest,
  PublicationsWhere
} from "../../gql/graphql";
import { TAG_IMAGE_PUB } from "../../config/env.config";

export const getMainPublicationImageLensService = async (
  publicationID: string
) => {
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
        return imageComment.metadata.asset.image.optimized?.uri;
      }
    }
  } catch (error) {
    throw new InternalServerError("Error Fetching Data From Lens API", 504);
  }
};
