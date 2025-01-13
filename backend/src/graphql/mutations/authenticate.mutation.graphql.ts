import { graphql } from "../../gql/index.js";

const authenticateMutationGraphql = graphql(`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      ... on AuthenticationTokens {
        accessToken
      }
      ... on WrongSignerError {
        reason
      }
      ... on ExpiredChallengeError {
        reason
      }
      ... on ForbiddenError {
        reason
      }
    }
  }
`);

export default authenticateMutationGraphql;
