import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import transactionStatusQueryGraphql from "../../graphql/queries/transaction-status.query.graphql";

const transactionStatusLensService = async (txHash: string) => {
  console.log("transactionStatusLensService transactionHash", txHash);

  return await baseClientAuthenticationUtil
    .query(transactionStatusQueryGraphql, {
      request: {
        txHash: txHash
      }
    })
    .toPromise();
};

export default transactionStatusLensService;
