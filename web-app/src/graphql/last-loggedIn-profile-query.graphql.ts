import { graphql } from "../gql";

const lastLoggedInProfileQuery = graphql(/* GraphQL */ `
  query lastLoggedInProfile($request: LastLoggedInProfileRequest!) {
    lastLoggedInProfile(request: $request) {
      id
    }
  }
`);

export default lastLoggedInProfileQuery;
