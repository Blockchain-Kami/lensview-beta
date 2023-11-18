import { graphql } from "../gql";

const profileManagedQueryGraphql = graphql(`
  query profilesManaged($request: ProfilesManagedRequest!) {
    profilesManaged(request: $request) {
      items {
        id
        handle {
          fullHandle
        }
      }
    }
  }
`);

export default profileManagedQueryGraphql;
