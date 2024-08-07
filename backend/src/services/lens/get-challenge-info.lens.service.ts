import { ChallengeRequest } from "../../gql/graphql.js";

import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util.js";
import ChallengeQueryGraphql from "../../graphql/queries/challenge.query.graphql.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Retrieves challenge information using the lens service.
 *
 * @param {ChallengeRequest} request - The challenge request object.
 * @return {Promise<ReturnType>} - A promise that resolves to the result of the query.
 */
const getChallengeInfoLensService = async (request: ChallengeRequest) => {
  try {
    logger.info(
      "get-challenge-info.lens.service.ts: getChallengeInfoLensService: Execution Started."
    );
    logger.info(
      "get-challenge-info.lens.service.ts: getChallengeInfoLensService: Signed By: " +
        request.signedBy
    );
    logger.info(
      "get-challenge-info.lens.service.ts: getChallengeInfoLensService: For Profile: " +
        request.for
    );
    return await getBaseClientHelperUtil
      .query(ChallengeQueryGraphql, { request })
      .toPromise();
  } catch (error) {
    logger.error(
      "get-challenge-info.lens.service.ts: getChallengeInfoLensService: Error in execution. " +
        error
    );
    return null;
  }
};

export default getChallengeInfoLensService;
