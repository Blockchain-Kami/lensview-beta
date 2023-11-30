import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import getRelatedPubsQuery from "../../graphql/queries/get-related-publications.query.graphql";
import { PUBLIC_APP_LENS_ID, PUBLIC_SOURCE_APP_ID } from "../../config/env.config";
import { InternalServerError } from "../../errors/internal-server-error.error";
import {
  LimitType,
  PublicationsRequest,
  PublicationsWhere,
  PublicationType
} from "../../gql/graphql";

/**
 * Retrieves the related parent publications based on a given tag.
 * @param {string} tag - The tag used to search for related parent publications.
 * @returns {Promise<Array>} - A promise that resolves to an array of related parent publications, or null if an error occurs.
 */
export const getRelatedParentPublicationsService = async (tag: string) => {
  const publicationsWhere: PublicationsWhere = {
    from: [PUBLIC_APP_LENS_ID],
    publicationTypes: [PublicationType.Post],
    metadata: {
      tags: {
        oneOf: [tag]
      },
      // publishedOn: [PUBLIC_SOURCE_APP_ID]
    }
  };
  const publicationsRequest: PublicationsRequest = {
    limit: LimitType.Fifty,
    where: publicationsWhere
  };
  try {
    const posts = await baseClientAuthenticationUtil
      .query(getRelatedPubsQuery, {
        request: publicationsRequest
      })
      .toPromise();
    return posts?.data?.publications;
  } catch (error) {
    throw new InternalServerError("Error Fetching Data From Lens API", 504);
  }
};
