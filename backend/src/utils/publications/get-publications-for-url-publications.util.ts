import { preprocessURLUtil } from "../preprocess-url.util";
import { createHashUtil } from "../create-hash.util";
import { getRelatedParentPublicationsService } from "../../services/lens/related-parent-publications.util";
import { SUCCESS } from "../../config/app-constants.config";

/**
 * Retrieves the publications related to a given URL.
 *
 * @param {string} URL - The URL for which to retrieve related publications.
 * @return {Promise<{relatedPublications: string[], message: string}>} - The related publications and a success message.
 */
export const getPublicationsForUrlPublicationsUtil = async (URL: string) => {
  const relatedPublications: Array<string> = [];
  const urlObject = preprocessURLUtil(URL);
  const hostname = urlObject?.[1];
  if (hostname) {
    const tag = createHashUtil(hostname.toString());

    const relatedPosts = await getRelatedParentPublicationsService(tag);

    const items = relatedPosts?.items || [];

    items.forEach((publication: any) => {
      if (publication.__typename === "Post")
        relatedPublications.push(publication?.id);
    });
  } else {
    throw new Error();
  }
  return {
    relatedPublications,
    message: SUCCESS
  };
};
