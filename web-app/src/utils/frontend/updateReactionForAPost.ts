import addReactionMutation from "../../graphql/addReactionMutation.graphql";
import removeReaction from "../../graphql/removeReaction";
import { userProfile } from "../../services/profile";
import { createUserClient } from "./createClient";
import type { ReactionTypes } from "../../gql/graphql";

export const addReactionToAPost = async (
  publicationId: string,
  reaction: ReactionTypes
) => {
  try {
    let profileId;
    const unsub = userProfile.subscribe((profile: any) => {
      profileId = profile.id;
    });
    unsub();

    const request = {
      profileId: profileId,
      reaction: reaction,
      publicationId: publicationId
    };

    const client = await createUserClient();
    return await client.mutation(addReactionMutation, { request }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeReactionFromAPost = async (
  publicationId: string,
  reaction: string
) => {
  try {
    let profileId;
    const unsub = userProfile.subscribe((profile: any) => {
      profileId = profile.id;
    });
    unsub();

    const request = {
      profileId: profileId,
      reaction: reaction,
      publicationId: publicationId
    };

    const client = await createUserClient();
    return await client.mutation(removeReaction, { request }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
