import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";

import { ChallengeRequest, SignedAuthChallenge } from "../../gql/graphql.js";

import authenticateLensService from "../../services/lens/authenticate.lens.service.js";
import challengeLensService from "../../services/lens/challenge.lens.service.js";

import baseClientHelperUtil from "../helpers/base-client.helper.util.js";
import {
  APP_WALLET_ADDRESS,
  LENS_API_URL,
  PRIVATE_KEY,
  APP_CONTRACT_ADDRESS
} from "../../config/env.config.js";
import { logger } from "../../log/log-manager.log.js";
import { Wallet } from "ethers";

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
      let accessToken = null;
      const challengeRequest: ChallengeRequest = {
        // TODO: Repalce with .env variables
        accountOwner: {
          account: APP_CONTRACT_ADDRESS,
          app: "0xaC19aa2402b3AC3f9Fe471D4783EC68595432465",
          owner: APP_WALLET_ADDRESS
        }
      };
      // Query challenge info
      const challengeInfo = await challengeLensService(challengeRequest);

      if (!challengeInfo || challengeInfo.error || !challengeInfo.data) {
        return baseClientHelperUtil;
      }

      const signer = new Wallet(PRIVATE_KEY);

      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );

      // Initialize provider using AlchemyProvider and API key
      // const signature = await signer.signMessage(
      //   challengeInfo.data.challenge.text
      // );

      const authenticationRequest: SignedAuthChallenge = {
        id: challengeInfo.data.challenge.id,
        signature: signature
      };
      // Authenticate the user and extract accessToken from authentication response
      const authenticationResponse = await authenticateLensService(
        authenticationRequest
      );
      logger.info(
        "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: authenticationResponse.data?.authenticate.__typename " +
          authenticationResponse.data?.authenticate.__typename
      );
      if (
        authenticationResponse.data?.authenticate.__typename ===
        "AuthenticationTokens"
      ) {
        logger.info(
          "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: Authentication Successful."
        );
        accessToken = authenticationResponse.data?.authenticate?.accessToken;
      } else if (
        authenticationResponse.data?.authenticate.__typename ===
          "WrongSignerError" ||
        authenticationResponse.data?.authenticate.__typename ===
          "ExpiredChallengeError" ||
        authenticationResponse.data?.authenticate.__typename ===
          "ForbiddenError"
      ) {
        logger.error(
          "get-authenticated-client.authentication.util.ts: getAuthenticatedClientAuthenticationUtil: Authentication Failed: " +
            authenticationResponse.data?.authenticate?.reason
        );
        return baseClientHelperUtil;
      }
      // Create and return authenticated client
      const authenticatedClient = createClient({
        url: LENS_API_URL,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: "cache-and-network",
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`,
            Origin: "https://api.lensview.io"
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
      throw new Error(
        "get-authenticated-client.authentication.util.ts\n" + error
      );
    }
  };
