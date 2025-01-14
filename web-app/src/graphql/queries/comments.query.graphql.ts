import { graphql } from "../../gql";

const commentsQueryGraphql = graphql(`
  query Comments($request: PostReferencesRequest!) {
    postReferences(request: $request) {
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
  }
`);

export default commentsQueryGraphql;
