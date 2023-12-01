import { gql } from "@urql/core";

const authenticateGraphql = gql/* GraphQL */ `
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export default authenticateGraphql;
