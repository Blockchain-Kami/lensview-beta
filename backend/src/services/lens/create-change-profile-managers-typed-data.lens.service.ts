import { ChangeProfileManagersRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import CreateChangeProfileManagersTypedDataMutationGraphql from "../../graphql/mutations/create-change-profile-managers-typed-data.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

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
