import airstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import similarPoapDetailsAirstackQueryGraphql from "../../graphql/airstack-query/similar-poap-details.airstack-query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";
export const getSimilarPoapDetailsAirstackService = async (
  handle1: string,
  handle2: string
) => {
  const request = {
    limit: 200,
    sortBy: "DESC",
    handle1: `${handle1}.lens`,
    handle2: `${handle2}.lens`
  };
  try {
    const poaps = await airstackClientHelperUtil.request(
      similarPoapDetailsAirstackQueryGraphql,
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
