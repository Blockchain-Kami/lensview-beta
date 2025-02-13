import { graphql } from "../../gql/index.js";

const createTextPostMutationGraphql = graphql(`
  mutation CreatePost($request: CreatePostRequest!) {
    post(request: $request) {
      ... on PostResponse {
        hash
        __typename
      }
      ... on SponsoredTransactionRequest {
        raw {
          type
          to
          from
          nonce
          gasLimit
          maxPriorityFeePerGas
          maxFeePerGas
          data
          value
          chainId
          customData {
            gasPerPubdata
            factoryDeps
            customSignature
            paymasterParams {
              paymaster
              paymasterInput
              __typename
            }
            __typename
          }
          data
          from
          gasLimit
          maxFeePerGas
          maxPriorityFeePerGas
          nonce
          to
          type
          value
          __typename
        }
        reason
        sponsoredReason
        __typename
        __typename
      }
      ... on SelfFundedTransactionRequest {
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
          __typename
        }
        reason
        selfFundedReason
        __typename
        __typename
      }
      ... on TransactionWillFail {
        reason
        __typename
      }
      __typename
    }
  }
`);

export default createTextPostMutationGraphql;
