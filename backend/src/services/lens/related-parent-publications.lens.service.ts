import { InternalServerError } from "../../errors/internal-server-error.error.js";
import {
  PageSize,
  PaginatedAnyPostsResult,
  PostsRequest
} from "../../gql/graphql.js";

import baseClient from "../../utils/helpers/base-client.helper.util.js";
import relatedPostsQuery from "../../graphql/queries/related-posts.query.graphql.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Retrieves the related parent publications based on a given tag.
 * @param {string[]} tags - The tag used to search for related parent publications.
 * @returns {Promise<Array>} - A promise that resolves to an array of related parent publications, or null if an error occurs.
 */
export const relatedParentPublicationsLensService = async (tags: string[]) => {
  logger.info(
    "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Execution Started."
  );
  logger.info(
    "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Input Parameter: " +
      tags
  );
  // const publicationsWhere: PublicationsWhere = {
  //   from: [APP_LENS_ID],
  //   publicationTypes: [PublicationType.Post],
  //   metadata: {
  //     tags: {
  //       oneOf: tags
  //     },
  //     publishedOn: [SOURCE_APP_ID]
  //   }
  // };

  // const publicationsRequest: PublicationsRequest = {
  //   limit: LimitType.Fifty,
  //   where: publicationsWhere
  // };
  const postsRequest: PostsRequest = {
    filter: {
      metadata: {
        tags: {
          oneOf: tags
        }
      },
      authors: ["0xA800F8980093E660b962E47E3474D8629ba35146"]
    },
    pageSize: PageSize.Ten
  };
  try {
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Calling getRelatedPubsQuery."
    );
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Input Parameter for getRelatedPubsQuery: " +
        JSON.stringify(postsRequest)
    );
    const result = await baseClient
      .query(relatedPostsQuery, {
        request: postsRequest
      })
      .toPromise();
    const response = result?.data?.posts as PaginatedAnyPostsResult;
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Response of getRelatedPubsQuery: " +
        JSON.stringify(response)
    );
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Execution End."
    );
    return response;
  } catch (error) {
    logger.error(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Error in execution: " +
        error
    );
    throw new InternalServerError("Error Fetching Data From Lens API", 504);
  }
};
