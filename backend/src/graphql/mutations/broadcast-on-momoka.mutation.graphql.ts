import { graphql } from "../../gql/index.js";

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
