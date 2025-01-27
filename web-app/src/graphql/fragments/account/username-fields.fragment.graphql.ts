import { graphql } from "../../../gql";

const usernameFieldsFragmentGraphql = graphql(`
  fragment UsernameFields on Username {
    localName
    linkedTo
    ownedBy
    value
  }
`);

export default usernameFieldsFragmentGraphql;
