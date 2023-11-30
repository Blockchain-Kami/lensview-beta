import { graphql } from "../../gql";

const getRelatedPubsQuery = graphql(/* GraphQL */ `
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
