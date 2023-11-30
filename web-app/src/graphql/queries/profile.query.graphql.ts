import { graphql } from "../../gql";

const profileQueryGraphql = graphql(`
  query Profile($request: ProfileRequest!) {
    profile(request: $request) {
      handle {
        fullHandle
        localName
      }
      id
      metadata {
        displayName
        picture {
          ... on NftImage {
            image {
              optimized {
                uri
              }
            }
          }
        }
      }
      ownedBy {
        address
      }
    }
  }
`);

export default profileQueryGraphql;
