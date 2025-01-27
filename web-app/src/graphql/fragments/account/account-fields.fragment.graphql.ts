import { graphql } from "../../../gql";

const accountFieldsFragmentGraphql = graphql(`
  fragment AccountFields on Account {
    owner
    address
    score
    metadata {
      ...AccountMetadata
    }
    username {
      ...UsernameFields
    }
    operations {
      ...LoggedInAccountOperationsFields
    }
  }
`);

export default accountFieldsFragmentGraphql;
