import { graphql } from "../../gql";

const lensTransactionStatusQueryGraphql = graphql(`
  query lensTransactionStatus($request: LensTransactionStatusRequest!) {
    lensTransactionStatus(request: $request) {
      status
      txHash
      reason
      extraInfo
    }
  }
`);

export default lensTransactionStatusQueryGraphql;
