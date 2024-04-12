import { graphql } from "../../gql";

const getTextOnlyCommentsOnPublicationQueryGraphql = graphql(/* GraphQL */ `
  query TextOnlyPublications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          metadata {
            ... on TextOnlyMetadataV3 {
              content
            }
          }
        }
      }
    }
  }
`);

export default getTextOnlyCommentsOnPublicationQueryGraphql;
