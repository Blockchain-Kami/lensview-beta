import { gql } from "@urql/core";

const CreateChangeProfileManagersTypedDataMutationGraphql = gql(/* GraphQL */ `
  mutation CreateChangeProfileManagersTypedData(
    $request: ChangeProfileManagersRequest!
  ) {
    createChangeProfileManagersTypedData(request: $request) {
      expiresAt
      id
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          ChangeDelegatedExecutorsConfig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          delegatorProfileId
          delegatedExecutors
          approvals
          configNumber
          switchToGivenConfig
        }
      }
    }
  }
`);

export default CreateChangeProfileManagersTypedDataMutationGraphql;
