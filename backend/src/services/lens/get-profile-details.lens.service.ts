import lensProfileDetailsQueryGraphql from "../../graphql/queries/lens-profile-details.query.graphql";
import { ProfileRequest } from "../../gql/graphql";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { InternalServerError } from "../../errors/internal-server-error.error";
export const getProfileDetailsLensService = async (handle: string) => {
  try {
    const client = createClient({
      url: "https://api-v2.lens.dev",
      exchanges: [cacheExchange, fetchExchange],
      requestPolicy: "cache-and-network"
    });
    const ProfileRequest: ProfileRequest = {
      forHandle: `lens/${handle}`
    };

    return await client
      .query(lensProfileDetailsQueryGraphql, { request: ProfileRequest })
      .toPromise();
  } catch (error) {
    throw new InternalServerError(
      "Error while fetching profile details from Lens: " + error,
      500
    );
  }
};
