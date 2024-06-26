import { SignedAuthChallenge } from "../../gql/graphql.js";

import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util.js";
import authenticateGraphql from "../../graphql/mutations/authenticate.query.graphql.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Authenticate the service using a signed authentication challenge.
 *
 * @param {SignedAuthChallenge} request - The signed authentication challenge.
 * @return {Promise} - A promise that resolves with the result of the authentication.
 */
const authenticateService = async (request: SignedAuthChallenge) => {
  logger.info(
    "authenticate.lens.service.ts: authenticateService: Execution Started."
  );
  return await getBaseClientHelperUtil
    .mutation(authenticateGraphql, { request })
    .toPromise();
};

export default authenticateService;
