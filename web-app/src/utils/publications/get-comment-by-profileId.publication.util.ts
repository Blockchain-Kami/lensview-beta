import {
  type LimitType,
  type PublicationsRequest,
  PublicationType
} from "../../gql/graphql";
import getCommentLensService from "../../services/lens/get-comment.lens.service";
const { VITE_SOURCE_APP_ID } = import.meta.env;
const { VITE_USER_COMMENT } = import.meta.env;
const { VITE_USER_POST } = import.meta.env;

const getCommentByProfileIdPublicationUtil = async (
  profileId: string,
  limit: LimitType,
  isPost: boolean
) => {
  try {
    const request: PublicationsRequest = {
      limit: limit,
      where: {
        from: [profileId],
        publicationTypes: [PublicationType.Comment],
        metadata: {
          publishedOn: [VITE_SOURCE_APP_ID],
          tags: {
            oneOf: [`${isPost ? VITE_USER_POST : VITE_USER_COMMENT}`]
          }
        }
      }
    };
    return await getCommentLensService(request!);
  } catch (error) {
    console.log("getCommentBasedOnParameterPublicationUtil error", error);
    throw error;
  }
};

export default getCommentByProfileIdPublicationUtil;
