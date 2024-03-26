import { graphql } from "../../gql";

const profileIdQueryGraphql = graphql(`
  query ProfileId($request: ProfileRequest!) {
    profile(request: $request) {
      id
    }
  }
`);

export default profileIdQueryGraphql;
