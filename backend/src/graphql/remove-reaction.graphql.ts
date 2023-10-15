const removeReactionGraphql = `
mutation removeReaction($request: ReactionRequest!) {
  removeReaction(request: $request)
}
`;

export default removeReactionGraphql;
