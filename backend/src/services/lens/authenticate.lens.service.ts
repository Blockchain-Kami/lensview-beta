import getBaseClientHelperUtil from "../../utils/helpers/get-base-client.helper.util";
import authenticateGraphql from "../../graphql/mutations/authenticate.query.graphql";
import { logger } from "../../log/log-manager.log";
import { SignedAuthChallenge } from "../../gql/graphql";

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
