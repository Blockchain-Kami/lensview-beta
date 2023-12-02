import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { RelatedPublicationsAppModel } from "../../models/app/related-publications.app.model";

const getRelatedPostPubIdsAppService = async (searchLinkOrKeywords: string) => {
  console.log(
    "getRelatedPostPubIdsAppService searchLinkOrKeywords:",
    searchLinkOrKeywords
  );

  try {
    const resp: RelatedPublicationsAppModel = await clientAxiosUtil.get(
      "publications/related",
      {
        params: {
          search_query: searchLinkOrKeywords
        }
      }
    );
    return resp?.publications;
  } catch (err) {
    // TODO: Handle error as mentioned in this article
    // https://www.builder.io/blog/safe-data-fetching
    console.log("getRelatedPostPubIdsAppService err:", err);
    throw err;
  }
};

export default getRelatedPostPubIdsAppService;
