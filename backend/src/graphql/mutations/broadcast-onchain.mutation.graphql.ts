import { graphql } from "../../gql/index.js";

const BroadcastOnchainMutationGraphql = graphql(`
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

export default BroadcastOnchainMutationGraphql;
