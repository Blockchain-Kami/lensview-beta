import { gql } from "@urql/core";

const similarPoapDetailsAirstackQueryGraphql = gql`
  query GetPOAPs(
    $limit: Int
    $sortBy: OrderBy
    $handle1: Identity
    $handle2: Identity
  ) {
    Poaps(
      input: {
        filter: { owner: { _eq: $handle1 } }
        blockchain: ALL
        limit: $limit
        order: { createdAtBlockNumber: $sortBy }
      }
    ) {
      Poap {
        id
        blockchain
        tokenId
        tokenAddress
        poapEvent {
          city
          eventName
          startDate
          eventId
          logo: contentValue {
            image {
              small
              medium
            }
          }
        }
        poapEvent {
          city
          eventName
          startDate
          eventId
          logo: contentValue {
            image {
              small
              medium
            }
          }
          poaps(input: { filter: { owner: { _eq: $handle2 } } }) {
            id
            blockchain
            tokenId
            tokenAddress
            poapEvent {
              city
              eventName
              startDate
              eventId
              logo: contentValue {
                image {
                  small
                  medium
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default similarPoapDetailsAirstackQueryGraphql;
