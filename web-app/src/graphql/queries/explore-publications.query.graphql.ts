import { graphql } from "../../gql";

const explorePublicationsQueryGraphql = graphql(`
  query ExplorePublications($request: ExplorePublicationRequest!) {
    explorePublications(request: $request) {
      items {
        ... on Post {
          id
          createdAt
          by {
            id
          }
          stats {
            comments
            upvotes: reactions(request: { type: UPVOTE })
            downvotes: reactions(request: { type: DOWNVOTE })
          }
          metadata {
            ... on LinkMetadataV3 {
              sharingLink
            }
          }
        }
      }
    }
  }
`);

export default explorePublicationsQueryGraphql;
