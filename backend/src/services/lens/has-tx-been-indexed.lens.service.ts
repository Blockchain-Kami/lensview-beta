import type {
  LensTransactionStatusQuery,
  LensTransactionStatusRequest
} from "../../gql/graphql.js";

import LensTransactionStatusQueryGraphql from "../../graphql/queries/lens-transaction-status.query.graphql.js";
import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Checks if a transaction has been indexed in the Lens service.
 *
 * @param {LensTransactionStatusRequest} request - The transaction status request.
 * @return {Promise<LensTransactionStatusQuery | undefined>} The transaction status query or undefined.
 */
const hasTxBeenIndexedLensService = async (
  request: LensTransactionStatusRequest
): Promise<LensTransactionStatusQuery | undefined> => {
  logger.info(
    "has-tx-been-indexed.lens.service.ts: hasTxBeenIndexedLensService: hasTxBeenIndexedLensService request" +
      JSON.stringify(request)
  );
  const result = await getBaseClientHelperUtil
    .query(LensTransactionStatusQueryGraphql, { request })
    .toPromise();
  const response = result.data;
  logger.info(
    "has-tx-been-indexed.lens.service.ts: hasTxBeenIndexedLensService: hasTxBeenIndexedLensService: result" +
      JSON.stringify(response)
  );

  return response;
};

export default hasTxBeenIndexedLensService;
