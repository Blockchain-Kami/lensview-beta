import { graphql } from "../../gql";

const createUnfollowTypeDataMutationGraphql = graphql(`
  mutation CreateUnfollowTypedData($request: UnfollowRequest!) {
    createUnfollowTypedData(request: $request) {
      expiresAt
      id
      typedData {
        types {
          Unfollow {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          unfollowerProfileId
          idsOfProfilesToUnfollow
        }
      }
    }
  }
`);

export default createUnfollowTypeDataMutationGraphql;
