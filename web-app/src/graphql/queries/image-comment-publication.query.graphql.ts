import { graphql } from "../../gql";

const imageCommentPublicationQueryGraphql = graphql(`
  query ImageCommentPublications($request: PublicationsRequest!) {
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

export default imageCommentPublicationQueryGraphql;
