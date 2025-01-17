import { graphql } from "../../gql";

const profilePostsQueryGraphql = graphql(`
  query ProfilePosts($request: PostsRequest!) {
    posts(request: $request) {
      items {
        ... on Post {
          id
          slug
          timestamp
          author {
            metadata {
              picture
              name
            }
            owner
            username {
              value
            }
            address
          }
          metadata {
            ... on TextOnlyMetadata {
              content
              tags
              attributes {
                key
                value
              }
            }
          }
          stats {
            comments
            upvotes: reactions(request: { type: UPVOTE })
            downvotes: reactions(request: { type: DOWNVOTE })
          }
          operations {
            hasUpVoted: hasReacted(request: { type: UPVOTE })
            hasDownVoted: hasReacted(request: { type: DOWNVOTE })
          }
          root {
            id
            slug
          }
        }
      }
    }
  }
`);

export default profilePostsQueryGraphql;
