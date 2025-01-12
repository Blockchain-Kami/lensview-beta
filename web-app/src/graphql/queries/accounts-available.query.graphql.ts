import { graphql } from "../../gql";

const accountsAvailableQueryGraphql = graphql(`
  query AccountsAvailable($request: AccountsAvailableRequest!) {
    accountsAvailable(request: $request) {
      items {
        ... on AccountOwned {
          account {
            address
            owner
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
          addedAt
        }
        ... on AccountManaged {
          permissions {
            canTransferTokens
            canTransferNative
            canSetMetadataUri
            canExecuteTransactions
          }
          addedAt
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
