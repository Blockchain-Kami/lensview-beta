import { graphql } from "../../../gql";

const metadataAttributeFieldsFragmentGraphql = graphql(`
  fragment MetadataAttributeFields on MetadataAttribute {
    type
    key
    value
  }
`);

export default metadataAttributeFieldsFragmentGraphql;
