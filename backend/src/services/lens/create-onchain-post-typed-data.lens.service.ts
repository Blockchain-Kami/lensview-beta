import type { OnchainPostRequest } from "../../gql/graphql";
import createOnchainPostTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-post-typed-data.mutation.graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";

/**
 * Creates an on-chain post typed data lens service.
 *
 * @param {OnchainPostRequest} request - The on-chain post request.
 * @return {Promise<any>} The result of the createOnchainPostTypedData mutation.
 */
const createOnchainPostTypedDataLensService = async (
  request: OnchainPostRequest
) => {
  console.log("createOnchainPostTypedDataLensService request", request);

  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(createOnchainPostTypedDataMutationGraphql, {
      request
    })
    .toPromise();

  return result.data?.createOnchainPostTypedData;
};

export default createOnchainPostTypedDataLensService;
