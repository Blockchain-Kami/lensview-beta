import { gql } from "@urql/core";

const BroadcastOnMomokaMutationGraphql = gql(/*GraphQL*/ `
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
