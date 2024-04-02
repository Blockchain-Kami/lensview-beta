import { graphql } from "../../gql";

const createMomokaCommentTypedDataMutationGraphql = graphql(`
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

export default createMomokaCommentTypedDataMutationGraphql;
