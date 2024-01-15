import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { UrlValidateResponseAppModel } from "../../models/app/responses/url-validate.response.app.model";

const searchPublicationAppService = async (searchURLOrKeywords: string) => {
  console.log(
    "searchPublicationAppService searchURLOrKeywords:",
    searchURLOrKeywords
  );

  try {
    return await clientAxiosUtil
      .get("url/validate", {
        params: {
          search_query: searchURLOrKeywords
        }
      })
      .then(
        (
          resp: AxiosResponse<UrlValidateResponseAppModel>
        ): UrlValidateResponseAppModel => {
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

export default searchPublicationAppService;
