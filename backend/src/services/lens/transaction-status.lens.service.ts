import baseClient from "../../utils/helpers/base-client.helper.util.js";
import transactionStatusQueryGraphql from "../../graphql/queries/transaction-status.query.graphql.js";

const transactionStatusLensService = async (txHash: string) => {
  console.log("transactionStatusLensService transactionHash", txHash);

  return await baseClient
    .query(transactionStatusQueryGraphql, {
      request: {
        txHash: txHash
      }
    })
    .toPromise();
};

export default transactionStatusLensService;
