import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import followMutationGraphql from "../../graphql/mutations/follow.mutation.graphql";
import type { FollowLensManagerRequest } from "../../gql/graphql";

const createFollowWithLensManagerLensService = async (
  request: FollowLensManagerRequest
) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(followMutationGraphql, { request })
    .toPromise();

  return result.data?.follow;
};

export default createFollowWithLensManagerLensService;
