import { gql } from "@urql/core";

const broadcastOnchainMutationGraphql = gql(/*GraphQL*/ `
  mutation BroadcastOnchain($request: BroadcastRequest!) {
    broadcastOnchain(request: $request) {
      ... on RelaySuccess {
        __typename
        txHash
        txId
      }
      ... on RelayError {
        __typename
        reason
      }
    }
  }
`);

export default broadcastOnchainMutationGraphql;
