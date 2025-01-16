import { graphql } from "../../gql";

const imageCommentsQueryGraphql = graphql(`
  query ImageComments($request: PostsRequest!) {
    posts(request: $request) {
      items {
        ... on Post {
          metadata {
            ... on ImageMetadata {
              image {
                item
              }
            }
          }
        }
      }
    }
  }
`);

export default imageCommentsQueryGraphql;
