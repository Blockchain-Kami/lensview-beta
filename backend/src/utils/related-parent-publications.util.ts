import baseClientUtil from "./lens-protocol/base-client.util";
import getRelatedPubsQuery from "../graphql/get-related-pubs-query.graphql";
import { PUBLIC_APP_LENS_ID } from "../config/env.config";
import { InternalServerError } from "../errors/internal-server-error.error";

/**
 * Retrieves the related parent publications based on a given tag.
 * @param {string} tag - The tag used to search for related parent publications.
 * @returns {Promise<Array>} - A promise that resolves to an array of related parent publications, or null if an error occurs.
 */
export const getRelatedParentPublicationsUtil = async (tag: string) => {
  try {
    const posts = await baseClientUtil
      .query(getRelatedPubsQuery, {
        hashedURL: tag,
        lensId: PUBLIC_APP_LENS_ID
      })
      .toPromise();
    return posts?.data?.publications;
  } catch (error) {
    throw new InternalServerError("Error Fetching Data From Lens API", 504);
  }
};
