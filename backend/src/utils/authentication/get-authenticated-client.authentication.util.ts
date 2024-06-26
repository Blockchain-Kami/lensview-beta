import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";

import { ChallengeRequest, SignedAuthChallenge } from "../../gql/graphql.js";

import authenticateService from "../../services/lens/authenticate.lens.service.js";
import getChallengeInfoLensService from "../../services/lens/get-challenge-info.lens.service.js";

import getBaseClientHelperUtil from "../helpers/get-base-client.helper.util.js";
import {
  APP_ADDRESS,
  APP_LENS_ID,
  LENS_API_URL
} from "../../config/env.config.js";
import { signer } from "../helpers/get-signer.helper.util.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Returns an authenticated client that can be used to make authenticated requests to the API server.
 * If authentication fails, null is returned.
 */
export const getAuthenticatedClientAuthenticationUtil: () => Promise<Client> =
  async () => {
    try {
      logger.info(
        "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: Execution Started."
      );
      const challengeRequest: ChallengeRequest = {
        for: APP_LENS_ID,
        signedBy: APP_ADDRESS
      };
      // Query challenge info
      const challengeInfo = await getChallengeInfoLensService(challengeRequest);

      if (!challengeInfo || challengeInfo.error || !challengeInfo.data) {
        return getBaseClientHelperUtil;
      }

      // Initialize provider using AlchemyProvider and API key
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );

      const request: SignedAuthChallenge = {
        id: challengeInfo.data.challenge.id,
        signature: signature
      };

      // Authenticate the user and extract accessToken from authentication response
      const {
        data: {
          authenticate: { accessToken }
        }
      } = await authenticateService(request);

      // Create and return authenticated client
      const authenticatedClient = createClient({
        url: LENS_API_URL,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: "cache-and-network",
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`
          }
        }
      });
      logger.info(
        "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: Execution Completed."
      );
      return authenticatedClient;
    } catch (error) {
      // Return baseClientUtil if authentication fails
      logger.error(
        "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: Error in execution" +
          error
      );
      return getBaseClientHelperUtil;
    }
  };
