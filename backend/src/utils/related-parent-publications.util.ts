import baseClientUtil from "./lens-protocol/base-client.util";
import relatedPubs from "../graphql/get-related-pubs.graphql";
import { PUBLIC_APP_LENS_ID } from "../config/env.config";

/**
 * Retrieves the related parent publications based on a given tag.
 * @param {string} tag - The tag used to search for related parent publications.
 * @returns {Promise<Array>} - A promise that resolves to an array of related parent publications, or null if an error occurs.
 */
export const getRelatedParentPublicationsUtil = async (tag: string) => {
  try {
    const posts = await baseClientUtil
      .query(relatedPubs, {
        hashedURL: tag,
        lensId: PUBLIC_APP_LENS_ID
      })
      .toPromise();

    return posts?.data?.publications;
  } catch (error) {
    console.log("Error in getRelatedParentPublications", error);
    return null;
  }
};
