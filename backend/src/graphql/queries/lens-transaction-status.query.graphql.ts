import { gql } from "@urql/core";

const lensTransactionStatusQueryGraphql = gql(/*GraphQL*/ `
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
