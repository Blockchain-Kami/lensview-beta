const getImageFromComment = `
query Publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
    ... on Comment {
      ...CommentFields
    }
  }
  }
}


fragment MetadataOutputFields on MetadataOutput {
  image
}


fragment CommentBaseFields on Comment {

  metadata {
    ...MetadataOutputFields
  }
}

fragment CommentFields on Comment {
  ...CommentBaseFields
}
`;

export default getImageFromComment;
