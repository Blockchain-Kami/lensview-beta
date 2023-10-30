import getPublication from "../../graphql/getPublication";
import baseClient from "./baseClient";
import { userProfile } from "../../services/profile";
import { PUBLIC_APP_LENS_ID } from "$env/static/public";

export const getPublicationByPubId = async (publicationId: string) => {
  let profileId;
  const unsub = userProfile.subscribe((profile: any) => {
    if (profile === undefined) profileId = PUBLIC_APP_LENS_ID;
    else profileId = profile.id;
  });
  unsub();

  try {
    const client = baseClient;
    return await client
      .query(getPublication, {
        request: {
          publicationIds: [publicationId]
        },
        profileId: profileId
      })
      .toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
