import type { SimilarityResponseAppModel } from "../../models/app/responses/similarity.response.app.model";
import type { AxiosResponse } from "axios";
import clientAxiosUtil from "../../utils/axios/client.axios.util";
import { profileUserStore } from "../../stores/user/profile.user.store";

const similarityAppService = async (handle1: string) => {
  console.log("similarityAppService handle1:", handle1);

  let handle2;
  const unsub = profileUserStore.subscribe((profile) => {
    handle2 = profile?.handle?.fullHandle.split("/")[1];
  });
  unsub();

  try {
    return await clientAxiosUtil
      .post("profile/similarity", {
        handle1: handle1,
        handle2: handle2
      })
      .then(
        (
          resp: AxiosResponse<SimilarityResponseAppModel>
        ): SimilarityResponseAppModel => {
          return resp.data;
        }
      );
  } catch (err) {
    // TODO: Handle error as mentioned in this article
    // https://www.builder.io/blog/safe-data-fetching
    console.log("profileInfoAppService err:", err);
    throw err;
  }
};

export default similarityAppService;
