import { graphql } from "../../gql/index.js";

const GetRelatedPubsQuery = graphql(/* GraphQL */ `
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

export default GetRelatedPubsQuery;
