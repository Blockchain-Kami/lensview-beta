import { graphql } from "../../gql";

const authenticateMutationGraphql = graphql(`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      ... on AuthenticationTokens {
        accessToken
        idToken
        refreshToken
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
