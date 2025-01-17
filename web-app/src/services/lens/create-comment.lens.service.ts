import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createCommentMutationGraphql from "../../graphql/mutations/create-comment.mutation.graphql";

const createCommentLensService = async (postId: string, contentUri: string) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createCommentMutationGraphql, {
      request: {
        contentUri,
        commentOn: {
          post: postId
        }
      }
    })
    .toPromise();

  return result.data?.post;
};

export default createCommentLensService;
