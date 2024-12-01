import { graphql } from "../../gql/index.js";

const GetMainPublicationImageQueryGraphql = graphql(/* GraphQL */ `
  query GetPublicationsImage($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          metadata {
            ... on ImageMetadataV3 {
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export default GetMainPublicationImageQueryGraphql;
