import { graphql } from "../../gql/index.js";

const CreateMomokaPostProfileManagerGraphql = graphql(/* GraphQL */ `
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

export default CreateMomokaPostProfileManagerGraphql;
