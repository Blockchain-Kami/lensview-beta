import { gql } from "@urql/core";

const createMomokaCommentProfileManagerGraphql = gql(/* GraphQL */ `
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

export default createMomokaCommentProfileManagerGraphql;
