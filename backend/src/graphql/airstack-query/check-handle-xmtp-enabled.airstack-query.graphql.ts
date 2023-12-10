import { gql } from "@urql/core";

const checkHandleXMTPEnabledAirstackQueryGraphql = gql`
  query GetSocial($identity: Identity!) {
    Wallet(input: { identity: $identity, blockchain: ethereum }) {
      xmtp {
        isXMTPEnabled
      }
    }
  }
`;

export default checkHandleXMTPEnabledAirstackQueryGraphql;
