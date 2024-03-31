import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import type { UnfollowRequest } from "../../gql/graphql";
import unfollowMutationGraphql from "../../graphql/mutations/unfollow.mutation.graphql";

const createUnfollowWithLensManagerLensService = async (
  request: UnfollowRequest
) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(unfollowMutationGraphql, { request })
    .toPromise();

  return result.data?.unfollow;
};

export default createUnfollowWithLensManagerLensService;
