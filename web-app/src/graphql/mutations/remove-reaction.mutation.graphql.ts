import { graphql } from "../../gql";

const removeReactionMutationGraphql = graphql(`
  mutation RemoveReaction($request: UndoReactionRequest!) {
    undoReaction(request: $request) {
      ... on UndoReactionResponse {
        success
      }
      ... on UndoReactionFailure {
        reason
      }
    }
  }
`);

export default removeReactionMutationGraphql;
