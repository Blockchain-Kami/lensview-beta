import { graphql } from "../../gql";

const commentOnMomokaMutationGraphql = graphql(`
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

export default commentOnMomokaMutationGraphql;
