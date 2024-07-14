import { graphql } from "../../gql/index.js";

const CreateMomokaCommentTypedDataMutationGraphql = graphql(`
  mutation CreateMomokaCommentTypedData($request: MomokaCommentRequest!) {
    createMomokaCommentTypedData(request: $request) {
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
          actionModules
          actionModulesInitDatas
          contentURI
          deadline
          nonce
          pointedProfileId
          pointedPubId
          profileId
          referenceModule
          referenceModuleData
          referenceModuleInitData
          referrerProfileIds
          referrerPubIds
        }
      }
    }
  }
`);

export default CreateMomokaCommentTypedDataMutationGraphql;
