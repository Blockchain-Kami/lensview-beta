import { graphql } from "../../gql/index.js";

const CreateMomokaCommentProfileManagerGraphql = graphql(/* GraphQL */ `
  mutation CommentOnMomoka($request: MomokaCommentRequest!) {
    commentOnMomoka(request: $request) {
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

export default CreateMomokaCommentProfileManagerGraphql;
