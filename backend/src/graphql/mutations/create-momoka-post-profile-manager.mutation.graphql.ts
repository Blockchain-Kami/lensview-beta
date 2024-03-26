import { gql } from "@urql/core";

const createMomokaPostProfileManagerGraphql = gql(/* GraphQL */ `
  mutation PostOnMomoka($request: MomokaPostRequest!) {
    postOnMomoka(request: $request) {
      ... on CreateMomokaPublicationResult {
        id
        proof
        momokaId
      }
      ... on LensProfileManagerRelayError {
        reason
      }
    }
  }
`);

export default createMomokaPostProfileManagerGraphql;
