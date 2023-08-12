const getPublication = `
query Publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
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
  tags
  attributes{
    traitType
    displayType
    value
  }
}

fragment PostFields on Post {
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
}
`;

export default getPublication;
