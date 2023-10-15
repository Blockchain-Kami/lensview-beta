import removeReactionGraphql from "../../graphql/remove-reaction.graphql";
import addReactionGraphql from "../../graphql/add-reaction.graphql";
import { PUBLIC_APP_LENS_ID } from "../../config/env.config";
import authenticatedClientUtil from "./authenticated-client.util";

export const addReactionToAPostUtil = async (
  publicationId: string,
  reaction: string
) => {
  try {
    const request = {
      profileId: PUBLIC_APP_LENS_ID,
      reaction: reaction,
      publicationId: publicationId
    };

    const client = await authenticatedClientUtil();
    return await client.mutation(addReactionGraphql, { request }).toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeReactionFromAPostUtil = async (
  publicationId: string,
  reaction: string
) => {
  try {
    const request = {
      profileId: PUBLIC_APP_LENS_ID,
      reaction: reaction,
      publicationId: publicationId
    };

    const client = await authenticatedClientUtil();
    return await client
      .mutation(removeReactionGraphql, { request })
      .toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
