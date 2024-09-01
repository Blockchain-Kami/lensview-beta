import { graphql } from "../../gql";

const revokeAuthenticationMutationGraphql = graphql(`
  mutation RevokeAuthentication($request: RevokeAuthenticationRequest!) {
    revokeAuthentication(request: $request)
  }
`);

export default revokeAuthenticationMutationGraphql;
