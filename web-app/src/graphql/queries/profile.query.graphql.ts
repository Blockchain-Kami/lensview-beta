import { graphql } from "../../gql";

const profileQueryGraphql = graphql(`
  query profile($request: ProfileRequest!) {
    profile(request: $request) {
      id
      ownedBy {
        address
        chainId
      }
      txHash
      createdAt
      stats {
        id
        followers
        following
        comments
        posts
        mirrors
        quotes
        publications
        reactions
        reacted
        countOpenActions
      }
      operations {
        id
        isBlockedByMe {
          value
          isFinalisedOnchain
        }
        hasBlockedMe {
          value
          isFinalisedOnchain
        }
        isFollowedByMe {
          value
          isFinalisedOnchain
        }
        isFollowingMe {
          value
          isFinalisedOnchain
        }
        canBlock
        canUnblock
        canFollow
        canUnfollow
      }
      interests
      invitesLeft
      onchainIdentity {
        proofOfHumanity
        ens {
          name
        }
        sybilDotOrg {
          verified
        }
        worldcoin {
          isHuman
        }
      }
      handle {
        id
        fullHandle
        namespace
        localName
        suggestedFormatted {
          full
          localName
        }
        ownedBy
      }
      signless
      sponsor
    }
  }
`);

export default profileQueryGraphql;
