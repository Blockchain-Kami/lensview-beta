import { getAuthenticatedClientAuthenticationUtil } from "../../utils/authentication/get-authenticated-client.authentication.util";
import createOnchainCommentTypedDataMutationGraphql from "../../graphql/mutations/create-onchain-comment-typed-data.mutation.graphql";
import { logger } from "../../log/log-manager.log";
import type { OnchainCommentRequest } from "../../gql/graphql";

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
    .mutation(createOnchainCommentTypedDataMutationGraphql, { request })
    .toPromise();
  logger.info(
    "comment-onchain-comment-typed-data.lens.service.ts: createOnchainCommentTypedDataLensService: Execution End."
  );
  return result.data?.createOnchainCommentTypedData;
};

export default createOnchainCommentTypedDataLensService;
