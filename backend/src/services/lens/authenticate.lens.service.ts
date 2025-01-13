import { SignedAuthChallenge } from "../../gql/graphql.js";

import baseClientHelperUtil from "../../utils/helpers/base-client.helper.util.js";
import AuthenticateGraphql from "../../graphql/mutations/authenticate.mutation.graphql.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Authenticate the service using a signed authentication challenge.
 *
 * @param {SignedAuthChallenge} request - The signed authentication challenge.
 * @return {Promise} - A promise that resolves with the result of the authentication.
 */
const authenticateLensService = async (request: SignedAuthChallenge) => {
  logger.info(
    "authenticate.lens.service.ts: authenticateService: Execution Started."
  );
  const data =  await baseClientHelperUtil
    .mutation(AuthenticateGraphql, { request })
    .toPromise();
  // console.log(data);
  return data;
};

export default authenticateLensService;
