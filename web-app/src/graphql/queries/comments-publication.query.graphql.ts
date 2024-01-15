import { graphql } from "../../gql";

const commentsPublicationQueryGraphql = graphql(`
  query CommentsPublication($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          id
          createdAt
          by {
            id
            handle {
              fullHandle
            }
            metadata {
              picture {
                ... on ImageSet {
                  optimized {
                    uri
                  }
                }
              }
              displayName
            }
            ownedBy {
              address
            }
          }
          stats {
            comments
            upvotes: reactions(request: { type: UPVOTE })
            downvotes: reactions(request: { type: DOWNVOTE })
          }
          metadata {
            ... on TextOnlyMetadataV3 {
              content
            }
            ... on ImageMetadataV3 {
              content
            }
          }
          operations {
            hasUpVoted: hasReacted(request: { type: UPVOTE })
            hasDownVoted: hasReacted(request: { type: DOWNVOTE })
          }
        }
      }
    }
  }
`);

export default commentsPublicationQueryGraphql;
