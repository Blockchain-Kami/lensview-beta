import type { OnchainCommentRequest } from "../../gql/graphql.js";

import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util.js";

import CreateOnchainCommentTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-comment-typed-data.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

const createOnchainCommentTypedDataLensService = async (
  request: OnchainCommentRequest
) => {
  logger.info(
    "comment-onchain-comment-typed-data.lens.service.ts: createOnchainCommentTypedDataLensService: Execution Started."
  );
  logger.info(
    "comment-onchain-comment-typed-data.lens.service.ts: createOnchainCommentTypedDataLensService: Input parameters: request" +
      request
  );
  const client = await getAuthenticatedClientAuthenticationUtil();
  const result = await client
    .mutation(CreateOnchainCommentTypedDataMutationGraphql, { request })
    .toPromise();
  logger.info(
    "comment-onchain-comment-typed-data.lens.service.ts: createOnchainCommentTypedDataLensService: Execution End."
  );
  return result.data?.createOnchainCommentTypedData;
};

export default createOnchainCommentTypedDataLensService;
