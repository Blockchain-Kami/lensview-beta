const removeReaction = `
mutation removeReaction($request: ReactionRequest!) {
  removeReaction(request: $request)
}
`;

export default removeReaction;
