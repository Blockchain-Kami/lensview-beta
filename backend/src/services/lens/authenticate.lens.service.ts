import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import authenticateGraphql from "../../graphql/mutations/authenticate.query.graphql";
import { SignedAuthChallenge } from "../../gql/graphql";

/**
 * Authenticate the service using a signed authentication challenge.
 *
 * @param {SignedAuthChallenge} request - The signed authentication challenge.
 * @return {Promise} - A promise that resolves with the result of the authentication.
 */
const authenticateService = async (request: SignedAuthChallenge) => {
  return await baseClientAuthenticationUtil
    .mutation(authenticateGraphql, { request })
    .toPromise();
};

export default authenticateService;
