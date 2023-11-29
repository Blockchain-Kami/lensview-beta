// import { graphql } from "../../gql";
import { gql } from "@urql/core";

/**
 * Retrieves a list of related publications based on a given request.
 *
 * @param {PublicationsRequest} request - The request object containing the necessary parameters.
 * @returns {Promise<Publication[]>} - A promise that resolves to an array of related publications.
 */
const getRelatedPubsQuery = gql/* GraphQL */ `
  query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
        }
      }
    }
  }
`;

export default getRelatedPubsQuery;
