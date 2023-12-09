import { gql } from "@urql/core";

const poapDetailsAirstackQueryGraphql = gql`
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
        poapEvent {
          city
          eventName
          startDate
          eventId
          logo: contentValue {
            image {
              medium
            }
          }
        }
      }
    }
  }
`;

export default poapDetailsAirstackQueryGraphql;
