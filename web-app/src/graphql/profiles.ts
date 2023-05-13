const profiles = `
query profiles($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
      ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
      ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
      ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
      ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
      ... on FeeFollowModuleSettings {
          type
            amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
      ... on ProfileFollowModuleSettings {
          type
        }
      ... on RevertFollowModuleSettings {
          type
        }
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

export default profiles;
