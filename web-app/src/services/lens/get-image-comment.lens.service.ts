import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import imageCommentPublicationQueryGraphql from "../../graphql/queries/image-comment-publication.query.graphql";

const getImageCommentLensService = async (id: string) => {
  console.log("getImageCommentLensService id", id);
  const result = await baseClientAuthenticationUtil.query(
    imageCommentPublicationQueryGraphql,
    {
      request: {
        where: {
          commentOn: {
            id: id
          },
          metadata: {
            tags: {
              oneOf: ["dd472d3370b389eb8399ea7c795ca9e76ff0d4d7"]
            }
          }
        }
      }
    }
  );

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
