import { graphql } from "../../gql";

const followMutationGraphql = graphql(`
  mutation Follow($request: FollowLensManagerRequest!) {
    follow(request: $request) {
      ... on RelaySuccess {
        txHash
        txId
      }
      ... on LensProfileManagerRelayError {
        reason
      }
    }
  }
`);

export default followMutationGraphql;
