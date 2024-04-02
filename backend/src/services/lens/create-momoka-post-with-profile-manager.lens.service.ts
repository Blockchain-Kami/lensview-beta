import { MomokaPostRequest } from "../../gql/graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import createMomokaPostProfileManagerGraphql from "../../graphql/mutations/create-momoka-post-profile-manager.mutation.graphql";
import { logger } from "../../log/log-manager.log";

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
    .mutation(createMomokaPostProfileManagerGraphql, {
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
