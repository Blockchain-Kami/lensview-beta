import { relatedParentPublicationsLensService } from "../../services/lens/related-parent-publications.lens.service";
import { FAILURE, SUCCESS } from "../../config/app-constants.config";

/**
 * Finds publications related to the input string.
 *
 * @param {string} inputString - The input string to search for related publications.
 * @return {Promise<{ relatedPublications: string[], message: string }>} - An object containing an array
 *   of related publication IDs and a success/failure message.
 */
export const getPublicationsForTagPublicationUtil = async (
  inputString: string
): Promise<{ relatedPublications: string[]; message: number }> => {
  try {
    const tags: string[] = [];
    const relatedPublications: Array<string> = [];
    const keywords = inputString.trim().split(" ");

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i].trim();
      tags.push(keyword.toLowerCase());
    }
    if (tags.length > 0) {
      const res = await relatedParentPublicationsLensService(tags);

      const items = res?.items || [];

      items.forEach((publication) => {
        if (publication.__typename === "Post")
          relatedPublications.push(publication?.id);
      });
    }

    return {
      relatedPublications,
      message: SUCCESS
    };
  } catch (e) {
    return {
      relatedPublications: [],
      message: FAILURE
    };
  }
};
