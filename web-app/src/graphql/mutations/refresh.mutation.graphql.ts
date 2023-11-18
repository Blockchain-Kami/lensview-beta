import { graphql } from "../../gql";

const refreshMutationGraphql = graphql(`
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`);

export default refreshMutationGraphql;
