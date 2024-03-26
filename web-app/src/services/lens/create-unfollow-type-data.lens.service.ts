import type { UnfollowRequest } from "../../gql/graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createUnfollowTypeDataMutationGraphql from "../../graphql/mutations/create-unfollow-type-data.mutation.graphql";

const createUnfollowTypeDataLensService = async (request: UnfollowRequest) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createUnfollowTypeDataMutationGraphql, { request })
    .toPromise();

  return result.data?.createUnfollowTypedData;
};

export default createUnfollowTypeDataLensService;
