import { graphql } from "../../gql";

const selfFundedTransactionRequestFieldsFragmentGraphql = graphql(`
  fragment SelfFundedTransactionRequestFields on SelfFundedTransactionRequest {
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
`);

export default selfFundedTransactionRequestFieldsFragmentGraphql;
