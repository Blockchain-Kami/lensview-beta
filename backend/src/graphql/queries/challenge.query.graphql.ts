import { gql } from "@urql/core";

const challengeQueryGraphql = gql(/*GraphQL*/ `
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
      id
    }
  }
`);

export default challengeQueryGraphql;
