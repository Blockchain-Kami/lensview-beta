import { graphql } from "../../gql";
import "../fragments/account/account-fields.fragment.graphql";

const accountsAvailableQueryGraphql = graphql(`
  query AccountsAvailable($request: AccountsAvailableRequest!) {
    accountsAvailable(request: $request) {
      items {
        ... on AccountManaged {
          account {
            owner
            address
            username {
              value
              id
            }
            metadata {
              name
              picture
              id
            }
          }
        }
      }
    }
  }
`);

export default accountsAvailableQueryGraphql;
