import {ChallengeRequest} from "../../gql/graphql.js";

import baseClient from "../../utils/helpers/base-client.helper.util.js";
import ChallengeQueryGraphql from "../../graphql/mutations/challenge.mutation.graphql.js";
import {logger} from "../../log/log-manager.log.js";
import {InternalServerError} from "../../errors/internal-server-error.error.js";

/**
 * Retrieves challenge information using the lens service.
 *
 * @param {ChallengeRequest} request - The challenge request object.
 * @return {Promise<ReturnType>} - A promise that resolves to the result of the query.
 */
const challengeLensService = async (request: ChallengeRequest) => {
  try {
    logger.info(
      "challenge.lens.service.ts: challengeLensService: Execution Started."
    );
    logger.info(
      "challenge.lens.service.ts: challengeLensService: Account Owner: " +
        request.accountOwner?.account
    );
    return await baseClient
      .mutation(ChallengeQueryGraphql, { request })
      .toPromise();
  } catch (error) {
    logger.error(
      "challenge.lens.service.ts: challengeLensService: Error in execution. " +
        error
    );
    throw new InternalServerError("challenge.lens.service.ts\n" + error, 500);
  }
};

export default challengeLensService;
