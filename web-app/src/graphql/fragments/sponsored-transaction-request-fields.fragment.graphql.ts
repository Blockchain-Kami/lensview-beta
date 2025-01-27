import { graphql } from "../../gql";

const sponsoredTransactionRequestFieldsFragmentGraphql = graphql(`
  fragment SponsoredTransactionRequestFields on SponsoredTransactionRequest {
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
`);

export default sponsoredTransactionRequestFieldsFragmentGraphql;
