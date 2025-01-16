import { graphql } from "../../gql/index.js";

const relatedPostsQuery = graphql(`
  query RelatedPosts($request: PostsRequest!) {
    posts(request: $request) {
      items {
        ... on Post {
          slug
          metadata {
            ... on ImageMetadata {
              tags
              title
              content
            }
          }
        }
      }
    }
  }
`);

export default relatedPostsQuery;
