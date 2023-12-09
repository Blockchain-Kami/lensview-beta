import airstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import poapDetailsAirstackQueryGraphql from "../../graphql/airstack-query/poap-details.airstack-query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
export const getPoapDetailsAirstackService = async (handle: string) => {
  const request = { limit: 200, sortBy: "DESC", handle: `${handle}.lens` };
  try {
    const poaps = await airstackClientHelperUtil.request(
      poapDetailsAirstackQueryGraphql,
      request
    );
    console.log(poaps.Poaps);
    return poaps?.Poaps;
  } catch (error) {
    throw new InternalServerError(
      "Error while fetching POAP details from Airstack: " + error,
      500
    );
  }
};
