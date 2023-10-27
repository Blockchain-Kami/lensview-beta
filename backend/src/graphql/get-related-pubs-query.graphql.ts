import { graphql } from "../gql";

const getRelatedPubsQuery = graphql(/* GraphQL */ `
  query Publications($hashedURL: String!, $lensId: ProfileId) {
    publications(
      request: {
        profileId: $lensId
        publicationTypes: [POST]
        metadata: { locale: "en-us", tags: { oneOf: [$hashedURL] } }
      }
    ) {
      items {
        ... on Post {
          id
        }
      }
    }
  }
`);

export default getRelatedPubsQuery;
