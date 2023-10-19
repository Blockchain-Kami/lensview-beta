import { getRelatedParentPublicationsUtil } from "../related-parent-publications.util";
import { FAILURE, SUCCESS } from "../../config/app-constants.config";

export const getPublicationsForTagPublicationsUtil = async (
  inputString: string
) => {
  try {
    const relatedPublications: Array<string> = [];
    const keywords = inputString.trim().split(" ");

    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i].trim();

      if (keyword != "") {
        const res = await getRelatedParentPublicationsUtil(
          keyword.toLowerCase()
        );
        const items = res?.items;
        // TODO 2: Create a generic type for publication which can be used in all the APIs
        items.forEach((publication: { id: string; __typename: string }) => {
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
