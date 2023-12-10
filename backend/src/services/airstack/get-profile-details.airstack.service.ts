import airstackClientHelperUtil from "../../utils/helpers/get-airstack-client.helper.util";
import profileDetailsAirstackQueryGraphql from "../../graphql/airstack-query/profile-details.airstack-query.graphql";
import { InternalServerError } from "../../errors/internal-server-error.error";

export const getProfileDetailsAirstackService = async (lensHandle: string) => {
  try {
    const response = await airstackClientHelperUtil.request(
      profileDetailsAirstackQueryGraphql,
      {
        identity: `${lensHandle}.lens`
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    throw new InternalServerError(
      "Error while fetching profile details from Airstack: " + error,
      500
    );
  }

  // const airstackDetailsProfile = await airstackClientHelperUtil.query(
  //   airstackProfileDetailsQueryGraphql,
  //   { identity: "vitalik.lens" }
  // ).toPromise();
  // // console.log(JSON.stringify(airstackDetailsProfile));
};
