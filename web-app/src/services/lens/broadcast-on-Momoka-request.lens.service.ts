import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import broadcastOnMomokaMutationGraphql from "../../graphql/mutations/broadcast-on-momoka.mutation.graphql";
import type { BroadcastRequest } from "../../gql/graphql";

const broadcastOnMomokaRequestLensService = async (
  request: BroadcastRequest
) => {
  const result = await authenticatedClientAuthenticationUtil()
    .mutation(broadcastOnMomokaMutationGraphql, { request })
    .toPromise();

  return result.data?.broadcastOnMomoka;
};

export default broadcastOnMomokaRequestLensService;
