const addReaction = `
mutation addReaction($request: ReactionRequest!) {
  addReaction(request: $request)
}
`;

export default addReaction;
