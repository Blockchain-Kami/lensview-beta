import { graphql } from "../gql";

const authenticateMutationGraphql = graphql(`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`);

export default authenticateMutationGraphql;
