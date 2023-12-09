import { gql } from "@urql/core";

const profileDetailsAirstackQueryGraphql = gql`
  query GetSocial($identity: Identity!) {
    Wallet(input: { identity: $identity, blockchain: ethereum }) {
      addresses
      primaryDomain {
        name
      }
      domains {
        isPrimary
        name
        tokenNft {
          address
          blockchain
        }
      }
      farcasterSocials: socials(
        input: { filter: { dappName: { _eq: farcaster } } }
      ) {
        blockchain
        profileName
        profileHandle
        profileImage
        followerCount
        followingCount
        profileTokenId
        profileImageContentValue {
          image {
            large
          }
        }
        profileCreatedAtBlockTimestamp
        profileUrl
        coverImageContentValue {
          image {
            large
          }
        }
        profileBio
        profileDisplayName
      }
      lensSocials: socials(input: { filter: { dappName: { _eq: lens } } }) {
        blockchain
        profileName
        profileHandle
        profileImage
        followerCount
        followingCount
        profileTokenId
        profileImageContentValue {
          image {
            large
          }
        }
        profileCreatedAtBlockTimestamp
        profileUrl
        coverImageContentValue {
          image {
            large
          }
        }
        profileBio
        profileDisplayName
      }
      xmtp {
        isXMTPEnabled
      }
    }
  }
`;

export default profileDetailsAirstackQueryGraphql;
