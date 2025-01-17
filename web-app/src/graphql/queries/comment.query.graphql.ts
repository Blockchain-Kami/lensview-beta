import { graphql } from "../../gql";

const commentQueryGraphql = graphql(`
  query Comment($request: PostRequest!) {
    post(request: $request) {
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
          ... on ImageMetadata {
            content
            tags
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
`);

export default commentQueryGraphql;
