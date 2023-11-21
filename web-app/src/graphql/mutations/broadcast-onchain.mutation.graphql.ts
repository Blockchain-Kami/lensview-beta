import { graphql } from "../../gql";

const broadcastOnchainMutationGraphql = graphql(`
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
