import { profileUserStore } from "../../stores/user/profile.user.store";
import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { ProfileInfoResponseAppModel } from "../../models/app/responses/profile-info.response.app.model";

const profileInfoAppService = async () => {
  let handle;
  const unsub = profileUserStore.subscribe((profile) => {
    handle = profile?.handle?.fullHandle.split("/")[1];
  });
  unsub();

  try {
    return await clientAxiosUtil
      .get("profile", {
        params: {
          handle: handle
        }
      })
      .then(
        (
          resp: AxiosResponse<ProfileInfoResponseAppModel>
        ): ProfileInfoResponseAppModel => {
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

export default profileInfoAppService;
