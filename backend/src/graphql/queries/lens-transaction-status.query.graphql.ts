import { graphql } from "../../gql/index.js";

const LensTransactionStatusQueryGraphql = graphql(`
  query lensTransactionStatus($request: LensTransactionStatusRequest!) {
    lensTransactionStatus(request: $request) {
      status
      txHash
      reason
      extraInfo
    }
  }
`);

export default LensTransactionStatusQueryGraphql;
