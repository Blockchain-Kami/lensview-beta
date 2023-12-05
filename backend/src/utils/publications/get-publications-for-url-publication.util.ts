import { preprocessURLHelperUtil } from "../helpers/preprocess-url.helper.util";
import { getRelatedPublicationsService } from "../../services/lens/related-parent-publications.lens.service";
import { SUCCESS } from "../../config/app-constants.config";

/**
 * Retrieves the publications related to a given URL.
 *
 * @param {string} URL - The URL for which to retrieve related publications.
 * @return {Promise<{relatedPublications: string[], message: string}>} - The related publications and a success message.
 */
export const getPublicationsForURLPublicationUtil = async (URL: string) => {
  const relatedPublications: Array<string> = [];
  const urlObject = preprocessURLHelperUtil(URL);
  const hostname = urlObject?.[1];
  if (hostname) {
    const tag = hostname.toString().toLowerCase();

    const relatedPosts = await getRelatedPublicationsService([tag]);

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
