import { graphql } from "../../gql";

const addReactionMutationGraphql = graphql(`
  mutation AddReaction($request: AddReactionRequest!) {
    addReaction(request: $request) {
      ... on AddReactionResponse {
        success
      }
      ... on AddReactionFailure {
        reason
      }
    }
  }
`);

export default addReactionMutationGraphql;
