const getDefaultProfile = `
query DefaultProfile($address: EthereumAddress!) {
  defaultProfile(request: { ethereumAddress: $address}) {
    id
    name
    isDefault
    metadata
    handle
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
    }
    ownedBy
  }
}
`;

export default getDefaultProfile;
