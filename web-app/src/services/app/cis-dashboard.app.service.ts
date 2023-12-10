import clientAxiosUtil from "../../utils/axios/client.axios.util";
import type { AxiosResponse } from "axios";
import type { CisDashboardResponseAppModel } from "../../models/app/responses/cis-dashboard.response.app.model";

const cisDashboardAppService = async (handle: string) => {
  try {
    return await clientAxiosUtil
      .get("profile/cis-dashboard", {
        params: {
          handle: handle
        }
      })
      .then(
        (
          resp: AxiosResponse<CisDashboardResponseAppModel>
        ): CisDashboardResponseAppModel => {
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

export default cisDashboardAppService;
