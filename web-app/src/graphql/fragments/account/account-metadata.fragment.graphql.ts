import { graphql } from "../../../gql";

const accountMetadataFragmentGraphql = graphql(`
  fragment AccountMetadata on AccountMetadata {
    id
    name
    bio
    picture
    coverPicture
    attributes {
      ...MetadataAttributeFields
    }
  }
`);

export default accountMetadataFragmentGraphql;
