import broadcastOnchainMutationGraphql from "../../graphql/mutations/broadcast-onchain.mutation.graphql";
import type { BroadcastRequest } from "../../gql/graphql";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";

const broadcastOnchainRequestLensService = async (
  request: BroadcastRequest
) => {
  // console.log("broadcastOnchainRequestLensService request", request);

  const result = await authenticatedClientAuthenticationUtil()
    .mutation(broadcastOnchainMutationGraphql, { request })
    .toPromise();

  return result.data?.broadcastOnchain;
};

export default broadcastOnchainRequestLensService;
