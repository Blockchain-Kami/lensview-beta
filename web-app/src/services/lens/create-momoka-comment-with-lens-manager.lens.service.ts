import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import commentOnMomokaMutationGraphql from "../../graphql/mutations/comment-on-momoka.mutation.graphql";
import type { MomokaCommentRequest } from "../../gql/graphql";

const createMomokaCommentWithLensManagerLensService = async (
  request: MomokaCommentRequest
) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(commentOnMomokaMutationGraphql, { request })
    .toPromise();

  return result.data?.commentOnMomoka;
};

export default createMomokaCommentWithLensManagerLensService;
