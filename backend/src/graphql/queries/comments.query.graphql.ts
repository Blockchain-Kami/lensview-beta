import { graphql } from "../../gql/index.js";

const commentsQueryGraphql = graphql(`
  query PostReferences($request: PostReferencesRequest!) {
    postReferences(request: $request) {
      items {
        ... on Post {
          slug
          metadata {
            ... on TextOnlyMetadata {
              content
            }
          }
          stats {
            reactions
          }
        }
      }
    }
  }
`);

export default commentsQueryGraphql;
