import { BroadcastRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import BroadcastOnMomokaMutationGraphql from "../../graphql/mutations/broadcast-on-momoka.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

export const broadcastOnMomokaRequestLensService = async (
  request: BroadcastRequest
) => {
  logger.info(
    "broadcast-on-momoka-request.lens.service.ts: broadcastOnMomokaRequestLensService: Execution Started."
  );
  logger.info(
    "broadcast-on-momoka-request.lens.service.ts: broadcastOnMomokaRequestLensService: request: " +
      JSON.stringify(request)
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(BroadcastOnMomokaMutationGraphql, { request })
    .toPromise();

  const response = result.data!.broadcastOnMomoka;
  logger.info(
    "broadcast-on-momoka-request.lens.service.ts: broadcastOnMomokaRequestLensService: response: " +
      JSON.stringify(response)
  );
  return response;
};
