import { MomokaCommentRequest } from "../../gql/graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import createMomokaCommentProfileManagerGraphql from "../../graphql/mutations/create-momoka-comment-profile-manager.mutation.graphql";
import { logger } from "../../log/log-manager.log";

const createMomokaCommentWithProfileManagerLensService = async (
  request: MomokaCommentRequest
) => {
  logger.info(
    "create-momoka-comment-with-profile-manager.lens.service.ts: createMomokaCommentWithProfileManagerLensService: Execution Started."
  );
  logger.info(
    "create-momoka-comment-with-profile-manager.lens.service.ts: createMomokaCommentWithProfileManagerLensService: request: " +
      JSON.stringify(request)
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(createMomokaCommentProfileManagerGraphql, {
      request
    })
    .toPromise();
  const response = result.data!.commentOnMomoka;
  logger.info(
    "create-momoka-comment-with-profile-manager.lens.service.ts: createMomokaCommentWithProfileManagerLensService: Execution Completed. Response: " +
      JSON.stringify(response)
  );
  return response;
};

export default createMomokaCommentWithProfileManagerLensService;
