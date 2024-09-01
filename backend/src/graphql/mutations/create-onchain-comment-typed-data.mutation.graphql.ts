import { graphql } from "../../gql/index.js";

const CreateOnchainCommentTypedDataMutationGraphql = graphql(`
  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {
    createOnchainCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          Comment {
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
          pointedProfileId
          pointedPubId
          referrerProfileIds
          referrerPubIds
          referenceModuleData
          actionModules
          actionModulesInitDatas
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`);

export default CreateOnchainCommentTypedDataMutationGraphql;
