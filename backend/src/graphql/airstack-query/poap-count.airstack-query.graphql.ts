import { gql } from "@urql/core";

const poapCountAirstackQueryGraphql = gql`
  query GetPOAPs($limit: Int, $sortBy: OrderBy, $handle: Identity) {
    Poaps(
      input: {
        filter: { owner: { _eq: $handle } }
        blockchain: ALL
        limit: $limit
        order: { createdAtBlockNumber: $sortBy }
      }
    ) {
      Poap {
        blockchain
      }
    }
  }
`;

export default poapCountAirstackQueryGraphql;
