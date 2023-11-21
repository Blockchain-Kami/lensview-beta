import { getRelatedParentPublicationsUtil } from "../related-parent-publications.util";
import { FAILURE, SUCCESS } from "../../config/app-constants.config";

/**
 * Finds publications related to the input string.
 *
 * @param {string} inputString - The input string to search for related publications.
 * @return {Promise<{ relatedPublications: string[], message: string }>} - An object containing an array
 *   of related publication IDs and a success/failure message.
 */
export const getPublicationsForTagPublicationsUtil = async (
  inputString: string
): Promise<{ relatedPublications: string[]; message: number }> => {
  try {
    const relatedPublications: Array<string> = [];
    const keywords = inputString.trim().split(" ");

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i].trim();

      if (keyword != "") {
        const res = await getRelatedParentPublicationsUtil(
          keyword.toLowerCase()
        );

        const items = res?.items || [];

        items.forEach((publication) => {
          if (publication.__typename === "Post")
            relatedPublications.push(publication?.id);
        });
      }
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