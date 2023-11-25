import { CommentRankingFilterType, LimitType } from "../../gql/graphql";
import type { PublicationsRequest } from "../../gql/graphql";

import getCommentLensService from "../../services/lens/get-comment.lens.service";

const getCommentBasedOnParameterPublicationUtil = async (
  publicationId: string,
  limit: LimitType,
  filterBy = "mostLiked"
) => {
  try {
    let request: PublicationsRequest;
    if (filterBy === "mostLikedComments") {
      request = {
        limit: limit,
        where: {
          commentOn: {
            id: publicationId,
            ranking: {
              filter: CommentRankingFilterType.Relevant
            }
          }
        }
      };
    } else if (filterBy === "latestComments") {
      request = {
        limit: limit,
        where: {
          commentOn: {
            id: publicationId
          }
        }
      };
    } else if (filterBy === "commentsById") {
      request = {
        limit: limit,
        where: {
          publicationIds: [publicationId]
        }
      };
    } else if (filterBy === "firstMostRelevantComment") {
      request = {
        limit: limit,
        where: {
          commentOn: {
            id: publicationId,
            ranking: {
              filter: CommentRankingFilterType.Relevant
            }
          },
          metadata: {
            tags: {
              oneOf: [
                "0f89daeb0a63c7b73224315c5514c21ba0453985", //userPubHash
                "418f361f5cdc602c856956bf752c06a29c52e54a" //anonymousPubHash
              ]
            }
          }
        }
      };
    }

    return await getCommentLensService(request!);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getCommentBasedOnParameterPublicationUtil;
