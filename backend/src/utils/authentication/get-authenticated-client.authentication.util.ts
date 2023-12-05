import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import getBaseClientHelperUtil from "../helpers/get-base-client.helper.util";
import {
  APP_ADDRESS,
  PUBLIC_APP_LENS_ID,
  PUBLIC_LENS_API_URL
} from "../../config/env.config";
import { signer } from "../helpers/get-signer.helper.util";
import authenticateService from "../../services/lens/authenticate.lens.service";
import { ChallengeRequest, SignedAuthChallenge } from "../../gql/graphql";
import getChallengeInfoLensService from "../../services/lens/get-challenge-info.lens.service";

/**
 * Returns an authenticated client that can be used to make authenticated requests to the API server.
 * If authentication fails, null is returned.
 */
export const getAuthenticatedClientAuthenticationUtil: () => Promise<Client> =
  async () => {
    try {
      const challengeRequest: ChallengeRequest = {
        for: PUBLIC_APP_LENS_ID,
        signedBy: APP_ADDRESS
      };
      // Query challenge info
      const challengeInfo = await getChallengeInfoLensService(challengeRequest);

      console.log("Challenge info,", challengeInfo);

      if (challengeInfo.error || !challengeInfo.data) {
        return getBaseClientHelperUtil;
      }

      // Initialize provider using AlchemyProvider and API key
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );

      console.log("Signature", signature);
      console.log("id", challengeInfo.data.challenge.id);

      const request: SignedAuthChallenge = {
        id: challengeInfo.data.challenge.id,
        signature: signature
      };

      // Authenticate the user
      const authData = await authenticateService(request);

      // Extract accessToken from authentication response
      const {
        data: {
          authenticate: { accessToken }
        }
      } = authData;

      console.log("Access token", accessToken);

      // Create and return authenticated client
      return createClient({
        url: PUBLIC_LENS_API_URL,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: "cache-and-network",
        fetchOptions: {
          headers: {
            "x-access-token": `Bearer ${accessToken}`
          }
        }
      });
    } catch (error) {
      // Return baseClientUtil if authentication fails
      console.log(error);
      return getBaseClientHelperUtil;
    }
  };
