import { gql } from "@urql/core";

const SocialOverlapAirstackQueryGraphql = gql`
  query GetSocialOverlap($identity1: Identity!, $identity2: Identity!) {
    wallet1: Wallet(input: { identity: $identity1, blockchain: ethereum }) {
      addresses
      primaryDomain {
        name
      }
      domains {
        name
      }
      farcasterSocials: socials(
        input: { filter: { dappName: { _eq: farcaster } } }
      ) {
        isDefault
        blockchain
        profileName
        profileHandle
        profileTokenId
        followerCount
        followingCount
      }
      lensSocials: socials(input: { filter: { dappName: { _eq: lens } } }) {
        isDefault
        blockchain
        profileName
        profileHandle
        profileTokenId
        followerCount
        followingCount
      }
      xmtp {
        isXMTPEnabled
      }
    }
    wallet2: Wallet(input: { identity: $identity2, blockchain: ethereum }) {
      addresses
      primaryDomain {
        name
      }
      domains {
        name
      }
      farcasterSocials: socials(
        input: { filter: { dappName: { _eq: farcaster } } }
      ) {
        isDefault
        blockchain
        profileName
        profileHandle
        profileTokenId
        followerCount
        followingCount
      }
      lensSocials: socials(input: { filter: { dappName: { _eq: lens } } }) {
        isDefault
        blockchain
        profileName
        profileHandle
        profileTokenId
        followerCount
        followingCount
      }
      xmtp {
        isXMTPEnabled
      }
    }
  }
`;

export default SocialOverlapAirstackQueryGraphql;
