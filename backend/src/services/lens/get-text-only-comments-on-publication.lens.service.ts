import {
  PageSize,
  PostReferencesRequest,
  PostReferenceType
} from "../../gql/graphql.js";
import { InternalServerError } from "../../errors/internal-server-error.error.js";
import { GetTextOnlyCommentsLensModel } from "../../models/lens/get-text-only-comments.lens.model.js";

import baseClient from "../../utils/helpers/base-client.helper.util.js";
import { httpStatusCodes } from "../../config/app-constants.config.js";
import { logger } from "../../log/log-manager.log.js";
import commentsQueryGraphql from "../../graphql/queries/comments.query.graphql.js";

export const getTextOnlyCommentsOnPublicationLensService = async (
  pubId: string
) => {
  try {
    logger.info(
      "get-text-only-comments-on-publication.lens.service.ts: getTextOnlyCommentsOnPublicationLensService: Execution Started."
    );
    // const publicationsWhere: PublicationsWhere = {
    //   commentOn: {
    //     id: pubId
    //   },
    //   metadata: {
    //     mainContentFocus: [PublicationMetadataMainFocusType.TextOnly],
    //     tags: {
    //       oneOf: ["1c5e2a7f174e40885e5be99baf6608a0965995ce"]
    //     },
    //     publishedOn: ["LensView"]
    //   }
    // };
    //
    // const publicationsRequest: PublicationsRequest = {
    //   limit: LimitType.Fifty,
    //   where: publicationsWhere
    // };
    //
    // const publicationStatsReactionArgs: PublicationStatsReactionArgs = {
    //   type: PublicationReactionType.Upvote
    // };

    const postReferenceRequest: PostReferencesRequest = {
      referencedPost: pubId,
      referenceTypes: [PostReferenceType.CommentOn],
      pageSize: PageSize.Ten
    };

    logger.info(
      "get-text-only-comments-on-publication.lens.service.ts: getTextOnlyCommentsOnPublicationLensService: publicationsRequest: " +
        JSON.stringify(postReferenceRequest)
    );

    const result = await baseClient
      .query(commentsQueryGraphql, {
        request: postReferenceRequest
      })
      .toPromise();

    const comments = result?.data
      ?.postReferences as GetTextOnlyCommentsLensModel;
    logger.info(
      "get-text-only-comments-on-publication.lens.service.ts: getTextOnlyCommentsOnPublicationLensService: Comments Fetched Successfully. Execution End."
    );
    return comments;
  } catch (error) {
    logger.error(
      "get-text-only-comments-on-publication.lens.service.ts: getTextOnlyCommentsOnPublicationLensService: error: " +
        error
    );
    throw new InternalServerError(
      "Error in Execution " + error,
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
