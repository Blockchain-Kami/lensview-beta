import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import imageCommentsQueryGraphql from "../../graphql/queries/image-comments.query.graphql";
import { PostType } from "../../gql/graphql";
const { VITE_IMAGE_PUB } = import.meta.env;

const getImageCommentLensService = async (id: string) => {
  console.log("getImageCommentLensService id", id);
  const result = await baseClientAuthenticationUtil
    .query(imageCommentsQueryGraphql, {
      request: {
        filter: {
          metadata: {
            tags: {
              all: [VITE_IMAGE_PUB, id]
            }
          },
          postTypes: [PostType.Comment]
        }
      }
    })
    .toPromise();

  const firstComment = result?.data?.posts?.items[0];
  if (
    firstComment?.__typename === "Post" &&
    firstComment.metadata.__typename === "ImageMetadata"
  ) {
    return firstComment.metadata?.image?.item;
  }
};

export default getImageCommentLensService;
