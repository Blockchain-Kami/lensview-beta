import airstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import poapCountAirstackQueryGraphql from "../../graphql/airstack-query/poap-count.airstack-query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
export const getPoapCountAirstackService = async (handle: string) => {
  const request = { limit: 200, sortBy: "DESC", handle: `${handle}.lens` };
  try {
    const poaps = await airstackClientHelperUtil.request(
      poapCountAirstackQueryGraphql,
      request
    );
    console.log(poaps);
    return poaps?.Poaps?.Poap?.length;
  } catch (error) {
    throw new InternalServerError(
      "Error while fetching POAP details from Airstack: " + error,
      500
    );
  }
};
