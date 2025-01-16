import { graphql } from "../../gql/index.js";

const mainPostImageQueryGraphql = graphql(`
  query ImageComments($request: PostsRequest!) {
    posts(request: $request) {
      items {
        ... on Post {
          metadata {
            ... on ImageMetadata {
              image {
                item
              }
              tags
            }
          }
          root {
            slug
          }
        }
      }
    }
  }
`);

export default mainPostImageQueryGraphql;
