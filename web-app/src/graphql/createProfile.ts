const createProfile = `
mutation createProfile($request: CreateProfileRequest!) {
  createProfile(request: $request) {
    ... on RelayerResult {
      txHash
      __typename
    }
    ... on RelayError {
      reason
      __typename
    }
    __typename
  }
}
`;

export default createProfile;
