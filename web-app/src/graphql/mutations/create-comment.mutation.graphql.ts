import { graphql } from "../../gql";

const createCommentMutationGraphql = graphql(`
  mutation CreateComment($request: CreatePostRequest!) {
    post(request: $request) {
      ... on PostResponse {
        hash
      }
      ... on SelfFundedTransactionRequest {
        reason
        raw {
          chainId
          data
          from
          gasLimit
          maxFeePerGas
          maxPriorityFeePerGas
          nonce
          to
          type
          value
        }
      }
      ... on SponsoredTransactionRequest {
        reason
        raw {
          chainId
          data
          from
          gasLimit
          maxFeePerGas
          maxPriorityFeePerGas
          nonce
          to
          type
          value
          customData {
            customSignature
            factoryDeps
            gasPerPubdata
            paymasterParams {
              paymaster
              paymasterInput
            }
          }
        }
      }
      ... on TransactionWillFail {
        reason
      }
    }
  }
`);

export default createCommentMutationGraphql;
