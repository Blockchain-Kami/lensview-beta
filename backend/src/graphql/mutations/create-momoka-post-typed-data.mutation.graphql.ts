import { graphql } from "../../gql/index.js";

const CreateMomokaPostTypedDataMutationGraphql = graphql(/*GraphQL*/ `
  mutation CreateMomokaPostTypedData($request: MomokaPostRequest!) {
    createMomokaPostTypedData(request: $request) {
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

export default CreateMomokaPostTypedDataMutationGraphql;
