const addReactionGraphql = `
mutation addReaction($request: ReactionRequest!) {
  addReaction(request: $request)
}
`;

export default addReactionGraphql;
