import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createUnfollowMutationGraphql from "../../graphql/mutations/create-unfollow.mutation.graphql";

const createUnfollowLensService = async (profileId: string) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createUnfollowMutationGraphql, {
      request: {
        account: profileId
      }
    })
    .toPromise();

  return result.data?.unfollow;
};

export default createUnfollowLensService;
