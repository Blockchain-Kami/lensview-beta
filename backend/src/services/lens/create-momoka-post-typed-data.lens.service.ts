import type { MomokaPostRequest } from "../../gql/graphql";
import CreateMomokaPostTypedDataMutationGraphql from "../../graphql/mutations/create-momoka-post-typed-data.mutation.graphql";
import { logger } from "../../log/log-manager.log";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";

const createMomokaPostTypedDataLensService = async (
  request: MomokaPostRequest
) => {
  logger.info(
    "create-momoka-post-typed-data.lens.service.ts: createMomokaPostTypedDataLensService: Execution Started."
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  logger.info(
    "create-momoka-post-typed-data.lens.service.ts: createMomokaPostTypedDataLensService: Executing CreateMomokaPostTypedDataMutationGraphql with request: " +
      JSON.stringify(request)
  );
  const result = await authenticateClient
    .mutation(CreateMomokaPostTypedDataMutationGraphql, {
      request
    })
    .toPromise();

  const createMomokaPostTypedData = result.data!.createMomokaPostTypedData;
  logger.info(
    "create-momoka-post-typed-data.lens.service.ts: createMomokaPostTypedDataLensService: Execution End. Response: " +
      JSON.stringify(createMomokaPostTypedData)
  );
  return createMomokaPostTypedData;
};

export default createMomokaPostTypedDataLensService;
