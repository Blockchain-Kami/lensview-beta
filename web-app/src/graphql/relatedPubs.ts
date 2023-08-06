const relatedPubs = `
query Publications($hashedURL: String!, $lensId: ProfileId) {
  publications(request: {
    profileId: $lensId,
    publicationTypes: [POST],
    metadata: {
      locale: "en-us"
      tags: {
        oneOf: [$hashedURL]
      }
    }
  }) {
    items { 
    ... on Post {
      ...PostFields
    }
    }
  }
}

fragment PostFields on Post {
  id
}
`

export default relatedPubs;