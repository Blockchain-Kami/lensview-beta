import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import getRelatedPubsQuery from "../../graphql/queries/get-related-publications.query.graphql";
import { APP_LENS_ID, SOURCE_APP_ID } from "../../config/env.config";
import { logger } from "../../log/log-manager.log";
import { InternalServerError } from "../../errors/internal-server-error.error";
import {
  LimitType,
  PublicationsRequest,
  PublicationsWhere,
  PublicationType
} from "../../gql/graphql";
import { GetRelatedPubsLensModel } from "../../models/lens/get-related-pubs.lens.model";

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
      {
        tags
      }
  );
  const publicationsWhere: PublicationsWhere = {
    from: [APP_LENS_ID],
    publicationTypes: [PublicationType.Post],
    metadata: {
      tags: {
        oneOf: tags
      },
      publishedOn: [SOURCE_APP_ID]
    }
  };

  const publicationsRequest: PublicationsRequest = {
    limit: LimitType.Fifty,
    where: publicationsWhere
  };

  try {
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Calling getRelatedPubsQuery."
    );
    logger.info(
      "related-parent-publications.lens.service.ts: relatedParentPublicationsLensService: Input Parameter for getRelatedPubsQuery: " +
        JSON.stringify(publicationsRequest)
    );
    const result = await getBaseClientHelperUtil
      .query(getRelatedPubsQuery, {
        request: publicationsRequest
      })
      .toPromise();
    const response = result?.data?.publications as GetRelatedPubsLensModel;
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
