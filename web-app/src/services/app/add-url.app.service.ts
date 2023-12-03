import { profileUserStore } from "../../stores/user/profile.user.store";
import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { RelatedPublicationsAppModel } from "../../models/app/related-publications.app.model";

const addUrlAppService = async (url: string) => {
  console.log("addUrlAppService url:", url);

  let handle;
  const unsub = profileUserStore.subscribe((profile) => {
    handle = profile?.handle;
  });
  unsub();

  try {
    return await clientAxiosUtil
      .post("url/new-pub", {
        url: url,
        lensHandle: handle
      })
      .then(
        (
          resp: AxiosResponse<RelatedPublicationsAppModel>
        ): RelatedPublicationsAppModel => {
          if (resp?.status === 204)
            return {
              isUrl: false,
              publications: [],
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

export default addUrlAppService;
