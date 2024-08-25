import { graphql } from "../../gql";

const profileManagedQueryGraphql = graphql(`
  query profilesManaged($request: ProfilesManagedRequest!) {
    profilesManaged(request: $request) {
      items {
        metadata {
          displayName
          picture {
            ... on ImageSet {
              optimized {
                uri
              }
            }
          }
        }
        id
        handle {
          fullHandle
        }
      }
    }
  }
`);

export default profileManagedQueryGraphql;
