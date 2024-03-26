import { graphql } from "../../gql";

const createFollowTypeDataMutationGraphql = graphql(`
  mutation CreateFollowTypedData($request: FollowRequest!) {
    createFollowTypedData(request: $request) {
      expiresAt
      id
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          Follow {
            name
            type
          }
        }
        value {
          nonce
          deadline
          followerProfileId
          idsOfProfilesToFollow
          followTokenIds
          datas
        }
      }
    }
  }
`);

export default createFollowTypeDataMutationGraphql;
