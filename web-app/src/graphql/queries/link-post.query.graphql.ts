import { graphql } from "../../gql";

const linkPostQueryGraphql = graphql(`
  query LinkPost($request: PostRequest!) {
    post(request: $request) {
      ... on Post {
        id
        metadata {
          ... on LinkMetadata {
            sharingLink
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
        timestamp
        author {
          username {
            value
          }
        }
        slug
      }
    }
  }
`);

export default linkPostQueryGraphql;
