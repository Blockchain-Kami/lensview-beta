import { MomokaPostRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import CreateMomokaPostProfileManagerGraphql from "../../graphql/mutations/create-momoka-post-profile-manager.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

const createMomokaPostWithProfileManagerLensService = async (
  request: MomokaPostRequest
) => {
  logger.info(
    "create-momoka-post-with-profile-manager.lens.service.ts: createMomokaPostWithProfileManagerLensService: Execution Started."
  );
  logger.info(
    "create-momoka-post-with-profile-manager.lens.service.ts: createMomokaPostWithProfileManagerLensService: request: " +
      JSON.stringify(request)
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(CreateMomokaPostProfileManagerGraphql, {
      request
    })
    .toPromise();
  const response = result.data!.postOnMomoka;
  logger.info(
    "create-momoka-post-with-profile-manager.lens.service.ts: createMomokaPostWithProfileManagerLensService: Execution Completed. Response: " +
      JSON.stringify(response)
  );
  return response;
};

export default createMomokaPostWithProfileManagerLensService;
