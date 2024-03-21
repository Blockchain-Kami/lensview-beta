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
      stats {
        followers
        following
        posts
        comments
        reactions
      }
      id
    }
  }
`);

export default profileQueryGraphql;
