import lensTransactionStatusQueryGraphql from "../../graphql/queries/lens-transaction-status.query.graphql";
import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import { logger } from "../../log/log-manager.log";
import type {
  LensTransactionStatusQuery,
  LensTransactionStatusRequest
} from "../../gql/graphql";

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
      request
  );
  const result = await getBaseClientHelperUtil
    .query(lensTransactionStatusQueryGraphql, { request })
    .toPromise();

  return result.data;
};

export default hasTxBeenIndexedLensService;
