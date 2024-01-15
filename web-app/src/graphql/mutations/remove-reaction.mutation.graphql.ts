import { graphql } from "../../gql";

const removeReactionMutationGraphql = graphql(`
  mutation RemoveReaction($request: ReactionRequest!) {
    removeReaction(request: $request)
  }
`);

export default removeReactionMutationGraphql;
