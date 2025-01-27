import { graphql } from "../../gql";

const createUnfollowMutationGraphql = graphql(`
  mutation Unfollow($request: CreateUnfollowRequest!) {
    unfollow(request: $request) {
      ... on UnfollowResponse {
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

export default createUnfollowMutationGraphql;
