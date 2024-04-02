import { graphql } from "../../gql";

const broadcastOnMomokaMutationGraphql = graphql(`
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

export default broadcastOnMomokaMutationGraphql;
