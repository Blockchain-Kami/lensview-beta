import broadcastOnchainMutationGraphql from "../../graphql/mutations/broadcast-onchain.mutation.graphql";
import { logger } from "../../log/log-manager.log";
import type { BroadcastRequest } from "../../gql/graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";

/**
 * Broadcasts the given request onchain using the lens service.
 *
 * @param {BroadcastRequest} request - The request to be broadcasted.
 * @return {Promise<type>} - A promise that resolves to the result of the broadcast.
 */
const broadcastOnchainRequestService = async (request: BroadcastRequest) => {
  logger.info(
    "broadcastOnchainRequestLensService: broadcastOnchainRequestService: Execution Started for request: " +
      JSON.stringify(request)
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(broadcastOnchainMutationGraphql, { request })
    .toPromise();

  return result.data?.broadcastOnchain;
};

export default broadcastOnchainRequestService;
