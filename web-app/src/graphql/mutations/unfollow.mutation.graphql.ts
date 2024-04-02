import { graphql } from "../../gql";

const unfollowMutationGraphql = graphql(`
  mutation Unfollow($request: UnfollowRequest!) {
    unfollow(request: $request) {
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

export default unfollowMutationGraphql;
