import { graphql } from "../../gql";

const exploreLinkPostsQueryGraphql = graphql(`
  query ExploreLinkPosts($request: PostsRequest!) {
    posts(request: $request) {
      items {
        ... on Post {
          id
          slug
          timestamp
          author {
            address
          }
          stats {
            comments
            upvotes: reactions(request: { type: UPVOTE })
            downvotes: reactions(request: { type: DOWNVOTE })
          }
          metadata {
            ... on LinkMetadata {
              sharingLink
            }
          }
        }
      }
    }
  }
`);

export default exploreLinkPostsQueryGraphql;
