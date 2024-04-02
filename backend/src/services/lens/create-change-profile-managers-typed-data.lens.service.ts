import { ChangeProfileManagersRequest } from "../../gql/graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import CreateChangeProfileManagersTypedDataMutationGraphql from "../../graphql/mutations/create-change-profile-managers-typed-data.mutation.graphql";
import { logger } from "../../log/log-manager.log";

const createChangeProfileManagersTypedDataLensService = async (
  request: ChangeProfileManagersRequest
) => {
  logger.info(
    "create-change-profile-managers-typed-data.lens.service.ts: createChangeProfileManagersTypedDataLensService: Execution Started."
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(CreateChangeProfileManagersTypedDataMutationGraphql, {
      request
    })
    .toPromise();
  const response = result.data!.createChangeProfileManagersTypedData;
  logger.info(
    "create-change-profile-managers-typed-data.lens.service.ts: createChangeProfileManagersTypedDataLensService: Execution Ended. Response: " +
      JSON.stringify(response)
  );
  return response;
};

export default createChangeProfileManagersTypedDataLensService;
