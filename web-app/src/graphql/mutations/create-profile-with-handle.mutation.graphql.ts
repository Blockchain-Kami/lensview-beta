import { graphql } from "../../gql";

const createProfileWithHandleMutationGraphql = graphql(`
  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {
    createProfileWithHandle(request: $request) {
      ... on RelaySuccess {
        txHash
        txId
      }
      ... on CreateProfileWithHandleErrorResult {
        reason
      }
    }
  }
`);

export default createProfileWithHandleMutationGraphql;
