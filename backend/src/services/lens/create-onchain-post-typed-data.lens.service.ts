import type { OnchainPostRequest } from "../../gql/graphql";
import createOnchainPostTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-post-typed-data.mutation.graphql";
import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import { logger } from "../../log/log-manager.log";

/**
 * Creates an on-chain post typed data lens service.
 *
 * @param {OnchainPostRequest} request - The on-chain post request.
 * @return {Promise<any>} The result of the createOnchainPostTypedData mutation.
 */
const createOnchainPostTypedDataLensService = async (
  request: OnchainPostRequest
) => {
  logger.info(
    "comment-onchain-post-typed-data.lens.service.ts: createOnchainPostTypedDataLensService: Execution Started."
  );
  logger.info(
    "comment-onchain-comment-typed-data.lens.service.ts: createOnchainPostTypedDataLensService: Input parameters: request" +
      JSON.stringify(request)
  );
  const authenticateClient = await getAuthenticatedClientAuthenticationUtil();
  const result = await authenticateClient
    .mutation(createOnchainPostTypedDataMutationGraphql, {
      request
    })
    .toPromise();
  logger.info(
    "comment-onchain-post-typed-data.lens.service.ts: createOnchainPostTypedDataLensService: Execution End."
  );
  return result.data?.createOnchainPostTypedData;
};

export default createOnchainPostTypedDataLensService;
