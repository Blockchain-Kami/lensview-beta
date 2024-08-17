import lensTransactionStatusQueryGraphql from "../../graphql/queries/lens-transaction-status.query.graphql";
import type {
  LensTransactionStatusQuery,
  LensTransactionStatusRequest
} from "../../gql/graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const hasTxBeenIndexedLensService = async (
  request: LensTransactionStatusRequest
): Promise<LensTransactionStatusQuery | undefined> => {
  // console.log("hasTxBeenIndexedLensService request", request);

  const result = await baseClientAuthenticationUtil
    .query(lensTransactionStatusQueryGraphql, { request })
    .toPromise();

  return result.data;
};

export default hasTxBeenIndexedLensService;
