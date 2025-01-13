import { graphql } from "../../gql";

const followMutationGraphql = graphql(`
  mutation Follow($request: CreateFollowRequest!) {
    follow(request: $request) {
      ... on FollowResponse {
        hash
      }
      ... on SelfFundedTransactionRequest {
        ...SelfFundedTransactionRequestFields
      }
      ... on SponsoredTransactionRequest {
        ...SponsoredTransactionRequestFields
      }
      ... on TransactionWillFail {
        reason
      }
    }
  }
`);

export default followMutationGraphql;
