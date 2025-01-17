import { graphql } from "../../gql";

const profileIdQueryGraphql = graphql(`
  query ProfileId($request: AccountRequest!) {
    account(request: $request) {
      address
    }
  }
`);

export default profileIdQueryGraphql;
