import { graphql } from "../../gql";

const profileQueryGraphql = graphql(`
  query Profile($request: ProfileRequest!) {
    profile(request: $request) {
      createdAt
      handle {
        fullHandle
        localName
      }
      metadata {
        displayName
        coverPicture {
          optimized {
            uri
          }
        }
        picture {
          ... on ImageSet {
            optimized {
              uri
            }
          }
        }
        bio
      }
      ownedBy {
        address
      }
      lensviewStats: stats(request: { forApps: ["LensView"] }) {
        publications
      }
      stats {
        followers
        following
        posts
        comments
        reactions
        publications
      }
      id
      operations {
        isFollowedByMe {
          value
        }
        isFollowingMe {
          value
        }
      }
      signless
      sponsor
    }
  }
`);

export default profileQueryGraphql;
