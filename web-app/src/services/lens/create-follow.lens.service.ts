import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createFollowMutationGraphql from "../../graphql/mutations/create-follow.mutation.graphql";

const createFollowLensService = async (profileId: string) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createFollowMutationGraphql, {
      request: {
        account: profileId
      }
    })
    .toPromise();

  return result.data?.follow;
};

export default createFollowLensService;
