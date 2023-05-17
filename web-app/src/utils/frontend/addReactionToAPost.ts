import addReaction from "../../graphql/addReaction";
import { userProfile } from "../../services/profile";
import { createUserClient } from "./createClient";

export const addReactionToAPost = async (publicationId: string, reaction: string) => {
  try {
    let profileId;
    const unsub = userProfile.subscribe((profile) => {
      profileId = profile.id;
    });
    unsub();

    const request = {
      "profileId": profileId,
      "reaction": reaction,
      "publicationId": publicationId
    };

    const client = await createUserClient();
    return await client.mutation(addReaction, { request }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
