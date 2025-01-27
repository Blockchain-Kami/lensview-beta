import { graphql } from "../../gql";

const profileQueryGraphql = graphql(`
  query Profile(
    $accountRequest: AccountRequest!
    $statsRequest: AccountStatsRequest!
  ) {
    account(request: $accountRequest) {
      createdAt
      username {
        value
        localName
      }
      metadata {
        name
        picture
        coverPicture
        bio
      }
      operations {
        isFollowedByMe
        isFollowingMe
      }
      owner
      address
    }
    accountStats(request: $statsRequest) {
      graphFollowStats {
        followers
        following
      }
      feedStats {
        comments
        posts
        quotes
        reacted
        reactions
        reposts
      }
    }
  }
`);

export default profileQueryGraphql;
