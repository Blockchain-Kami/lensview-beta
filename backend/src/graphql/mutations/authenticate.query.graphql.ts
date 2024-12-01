import { graphql } from "../../gql/index.js";

const AuthenticateGraphql = graphql(/* GraphQL */ `
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`);

export default AuthenticateGraphql;
