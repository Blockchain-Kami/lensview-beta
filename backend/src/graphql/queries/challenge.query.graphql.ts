import { graphql } from "../../gql/index.js";

const ChallengeQueryGraphql = graphql(`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
      id
    }
  }
`);

export default ChallengeQueryGraphql;
