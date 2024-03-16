import { MomokaCommentRequest } from "../../gql/graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import createMomokaCommentProfileManagerGraphql from "../../graphql/mutations/create-momoka-comment-profile-manager.mutation.graphql";

const createMomokaCommentWithProfileManagerLensService = async (
  request: MomokaCommentRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(createMomokaCommentProfileManagerGraphql, {
      request
    })
    .toPromise();

  return result.data!.commentOnMomoka;
};

export default createMomokaCommentWithProfileManagerLensService;
