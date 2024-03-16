import { BroadcastRequest } from "../../gql/graphql";
import BroadcastOnMomokaMutationGraphql from "../../graphql/mutations/broadcast-on-momoka.mutation.graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";

export const broadcastOnMomokaRequestLensService = async (
  request: BroadcastRequest
) => {
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(BroadcastOnMomokaMutationGraphql, { request })
    .toPromise();

  return result.data!.broadcastOnMomoka;
};
