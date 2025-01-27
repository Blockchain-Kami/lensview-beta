import { graphql } from "../../gql";

const createFollowMutationGraphql = graphql(`
  mutation CreateFollow($request: CreateFollowRequest!) {
    follow(request: $request) {
      ... on FollowResponse {
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

export default createFollowMutationGraphql;
