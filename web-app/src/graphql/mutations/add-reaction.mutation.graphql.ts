import { graphql } from "../../gql";

const addReactionMutationGraphql = graphql(`
  mutation AddReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`);

export default addReactionMutationGraphql;
