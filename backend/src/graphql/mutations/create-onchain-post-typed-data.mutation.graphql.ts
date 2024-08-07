import { graphql } from "../../gql/index.js";

const CreateOnchainPostTypedDataMutationGraphql = graphql(`
  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {
    createOnchainPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          Post {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          actionModules
          actionModulesInitDatas
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`);

export default CreateOnchainPostTypedDataMutationGraphql;
