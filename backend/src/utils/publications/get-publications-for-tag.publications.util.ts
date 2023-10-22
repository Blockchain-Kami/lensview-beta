import { getRelatedParentPublicationsUtil } from "../related-parent-publications.util";
import { FAILURE, SUCCESS } from "../../config/app-constants.config";
import { PostPublicationsLensProtocolModel } from "../../models/lens-protocol/post.publications.lens-protocol.model";

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
        items.forEach((publication: PostPublicationsLensProtocolModel) => {
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
