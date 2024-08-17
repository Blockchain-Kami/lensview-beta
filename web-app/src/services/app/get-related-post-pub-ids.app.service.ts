import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { RelatedPublicationsResponseAppModel } from "../../models/app/responses/related-publications.response.app.model";
import type { AxiosResponse } from "axios";

const getRelatedPostPubIdsAppService = async (searchURLOrKeywords: string) => {
  // console.log(
  //   "getRelatedPostPubIdsAppService searchURLOrKeywords:",
  //   searchURLOrKeywords
  // );

  try {
    return await clientAxiosUtil
      .get("publications/related", {
        params: {
          search_query: searchURLOrKeywords
        }
      })
      .then(
        (
          resp: AxiosResponse<RelatedPublicationsResponseAppModel>
        ): RelatedPublicationsResponseAppModel => {
          if (resp?.status === 204)
            return {
              publicationIDs: [],
              message: "No publications found"
            };

          return resp.data;
        }
      );
  } catch (err) {
    // TODO: Handle error as mentioned in this article
    // https://www.builder.io/blog/safe-data-fetching
    console.log("getRelatedPostPubIdsAppService err:", err);
    throw err;
  }
};

export default getRelatedPostPubIdsAppService;
