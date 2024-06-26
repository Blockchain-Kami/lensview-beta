import { gql } from "@urql/core";

const getRelatedPubsQuery = gql(/* GraphQL */ `
  query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
        }
      }
    }
  }
`);

export default getRelatedPubsQuery;
