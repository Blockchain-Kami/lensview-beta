import { graphql } from "../../gql";

const challengeMutationGraphql = graphql(`
  mutation Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      id
      text
    }
  }
`);

export default challengeMutationGraphql;
