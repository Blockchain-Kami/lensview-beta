import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import lensTransactionStatusQueryGraphql from "../../graphql/queries/lens-transaction-status.query.graphql";

const getLensTransactionStatusLensService = async (
  txId: string | null,
  txHash: string | null
) => {
  // console.log("getLensTransactionStatusLensService txId", txId);
  // console.log("getLensTransactionStatusLensService txHash", txHash);

  if (!txId && !txHash) {
    throw new Error("txId or txHash is required");
  }

  if (txId) {
    return await baseClientAuthenticationUtil
      .query(lensTransactionStatusQueryGraphql, {
        request: {
          forTxId: txId
        }
      })
      .toPromise();
  } else {
    return await baseClientAuthenticationUtil
      .query(lensTransactionStatusQueryGraphql, {
        request: {
          forTxHash: txHash
        }
      })
      .toPromise();
  }
};

export default getLensTransactionStatusLensService;
