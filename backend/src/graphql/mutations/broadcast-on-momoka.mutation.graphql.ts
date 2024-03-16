import { graphql } from "../../gql";

const BroadcastOnMomokaMutationGraphql = graphql(`
  mutation BroadcastOnMomoka($request: BroadcastRequest!) {
    broadcastOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        id
        proof
        momokaId
      }
      ... on RelayError {
        __typename
        reason
      }
    }
  }
`);

export default BroadcastOnMomokaMutationGraphql;
