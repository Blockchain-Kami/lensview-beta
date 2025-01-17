import { graphql } from "../../gql";

const transactionStatusQueryGraphql = graphql(`
  query TransactionStatus($request: TransactionStatusRequest!) {
    transactionStatus(request: $request) {
      ... on FinishedTransactionStatus {
        blockTimestamp
      }
      ... on PendingTransactionStatus {
        blockTimestamp
      }
      ... on NotIndexedYetStatus {
        reason
      }
      ... on FailedTransactionStatus {
        reason
      }
    }
  }
`);

export default transactionStatusQueryGraphql;
