import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import followMutationGraphql from "../../graphql/mutations/follow.mutation.graphql";

const createFollowLensService = async (profileId: string) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(followMutationGraphql, {
      request: {
        account: profileId
      }
    })
    .toPromise();

  return result.data?.follow;
};

export default createFollowLensService;
