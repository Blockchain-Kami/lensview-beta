import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import CreateChangeProfileManagersTypedDataMutationGraphql from "../../graphql/mutations/create-change-profile-managers-typed-data.mutation.graphql";
import { ChangeProfileManagersRequest } from "../../gql/graphql";

const createChangeProfileManagersTypedDataLensService = async (
  request: ChangeProfileManagersRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(CreateChangeProfileManagersTypedDataMutationGraphql, {
      request
    })
    .toPromise();
  return result.data!.createChangeProfileManagersTypedData;
};

export default createChangeProfileManagersTypedDataLensService;
