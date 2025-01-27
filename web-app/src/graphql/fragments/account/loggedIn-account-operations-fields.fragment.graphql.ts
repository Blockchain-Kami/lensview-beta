import { graphql } from "../../../gql";

const loggedInAccountOperationsFieldsFragmentGraphql = graphql(`
  fragment LoggedInAccountOperationsFields on LoggedInAccountOperations {
    id
    isFollowedByMe
    isFollowingMe
    isMutedByMe
    isBlockedByMe
    hasBlockedMe
    canBlock
    canUnblock
    hasReported
  }
`);

export default loggedInAccountOperationsFieldsFragmentGraphql;
