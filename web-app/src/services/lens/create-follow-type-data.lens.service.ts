import type { FollowRequest } from "../../gql/graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import createFollowTypeDataMutationGraphql from "../../graphql/mutations/create-follow-type-data.mutation.graphql";

const createFollowTypeDataLensService = async (request: FollowRequest) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(createFollowTypeDataMutationGraphql, { request })
    .toPromise();

  return result.data?.createFollowTypedData;
};

export default createFollowTypeDataLensService;
