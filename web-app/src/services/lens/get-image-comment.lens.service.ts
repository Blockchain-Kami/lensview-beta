import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import imageCommentPublicationQueryGraphql from "../../graphql/queries/image-comment-publication.query.graphql";
const { VITE_IMAGE_PUB } = import.meta.env;

const getImageCommentLensService = async (id: string) => {
  // console.log("getImageCommentLensService id", id);
  const result = await baseClientAuthenticationUtil
    .query(imageCommentPublicationQueryGraphql, {
      request: {
        where: {
          commentOn: {
            id: id
          },
          metadata: {
            tags: {
              oneOf: [VITE_IMAGE_PUB]
            }
          }
        }
      }
    })
    .toPromise();

  const firstComment = result?.data?.publications?.items[0];
  if (
    firstComment?.__typename === "Comment" &&
    firstComment.metadata.__typename === "ImageMetadataV3"
  ) {
    if (
      firstComment.metadata?.asset?.image?.__typename === "EncryptableImageSet"
    ) {
      return firstComment.metadata.asset.image.optimized?.uri;
    }
  }
};

export default getImageCommentLensService;
