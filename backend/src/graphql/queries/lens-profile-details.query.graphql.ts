import { graphql } from "../../gql";

const lensProfileDetailsQueryGraphql = graphql(`
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
        },
        displayName
      }
    }
  }
`);

export default lensProfileDetailsQueryGraphql;
