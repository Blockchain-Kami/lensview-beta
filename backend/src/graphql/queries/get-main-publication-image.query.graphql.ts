import { gql } from "@urql/core";

const getMainPublicationImageQueryGraphql = gql(/* GraphQL */ `
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

export default getMainPublicationImageQueryGraphql;
