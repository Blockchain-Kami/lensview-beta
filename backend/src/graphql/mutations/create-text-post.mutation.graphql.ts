import { graphql } from "../../gql/index.js";

const createTextPostMutationGraphql = graphql(`
  mutation Mutation($request: CreatePostRequest!) {
    post(request: $request) {
      ... on PostResponse {
        hash
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
        }
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
            }
          }
        }
      }
    }
  }
`);

export default createTextPostMutationGraphql;
