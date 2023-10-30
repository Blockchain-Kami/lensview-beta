import getComments from "../../graphql/getComments";
import baseClient from "./baseClient";
import { userProfile } from "../../services/profile";
import { PUBLIC_APP_LENS_ID } from "$env/static/public";

export const getCommentOfPublication = async (
  publicationId: string,
  limit: number,
  filterBy = "mostLiked"
) => {
  let profileId;
  const unsub = userProfile.subscribe((profile: any) => {
    if (profile === undefined) profileId = PUBLIC_APP_LENS_ID;
    else profileId = profile.id;
  });
  unsub();

  try {
    let request;
    if (filterBy === "mostLiked") {
      request = {
        commentsOf: publicationId,
        commentsOfOrdering: "RANKING",
        commentsRankingFilter: "RELEVANT",
        limit: limit
      };
    } else if (filterBy === "latest") {
      request = {
        commentsOf: publicationId,
        commentsOfOrdering: "DESC",
        limit: limit
      };
    } else if (filterBy === "post") {
      request = {
        publicationIds: [publicationId]
      };
    } else if (filterBy === "imagePub") {
      request = {
        commentsOf: publicationId,
        commentsOfOrdering: "DESC",
        limit: limit,
        metadata: {
          tags: {
            oneOf: [
              "0f89daeb0a63c7b73224315c5514c21ba0453985",
              "418f361f5cdc602c856956bf752c06a29c52e54a"
            ]
          }
        }
      };
    }

    const client = baseClient;
    return await client
      .query(getComments, {
        request: request,
        profileId: profileId
      })
      .toPromise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
