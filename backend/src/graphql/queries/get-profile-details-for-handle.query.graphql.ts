import { graphql } from "../../gql";

const getProfileDetailsForHandleQueryGraphql = graphql(`
  query Profile($request: ProfileRequest!) {
    profile(request: $request) {
      createdAt
      handle {
        fullHandle
      }
      id
      stats {
        comments
        publications
        reactions
      }
      metadata {
        coverPicture {
          optimized {
            uri
          }
        }
        displayName
        bio
        picture {
          ... on ImageSet {
            optimized {
              uri
            }
          }
        }
      }
    }
  }
`);

export default getProfileDetailsForHandleQueryGraphql;
