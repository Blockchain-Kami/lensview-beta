const getComments = `
query Publications($request: PublicationsQueryRequest!, $profileId: ProfileId!) {
  publications(request: $request) {
    items {
    ... on Comment {
      ...CommentFields
    }
  }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}



fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  metadata
  handle
  picture {
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
  totalDownvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
}


fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  appId
  reaction(request: { profileId: $profileId })
}

fragment CommentFields on Comment {
  ...CommentBaseFields
}
`;

export default getComments;
