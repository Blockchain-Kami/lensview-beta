import { graphql } from "../../gql";

const refreshMutationGraphql = graphql(`
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      ... on AuthenticationTokens {
        accessToken
        refreshToken
        idToken
      }
      ... on ForbiddenError {
        reason
      }
    }
  }
`);

export default refreshMutationGraphql;
