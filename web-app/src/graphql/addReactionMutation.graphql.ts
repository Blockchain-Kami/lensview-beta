import { graphql } from "../gql";

const addReactionMutation = graphql(/* GraphQL */ `
  mutation addReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`);

export default addReactionMutation;
