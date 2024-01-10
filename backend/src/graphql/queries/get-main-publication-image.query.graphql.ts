import { graphql } from "../../gql";

const getMainPublicationImageQueryGraphql = graphql(/* GraphQL */ `
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
