import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import { ethers } from "ethers";
import baseClientUtil from "./base-client.util";
import challengeGraphql from "../../graphql/challenge.graphql";
import {
  API_KEY,
  APP_ADDRESS,
  PRIVATE_KEY,
  PUBLIC_LENS_API_URL
} from "../../config/env.config";
import authenticateGraphql from "../../graphql/authenticate.graphql";

/**
 * Returns an authenticated client that can be used to make authenticated requests to the API server.
 * If authentication fails, null is returned.
 */
const authenticatedClientUtil: () => Promise<Client> = async () => {
  try {
    // Query challenge info
    const challengeInfo = await baseClientUtil
      .query(challengeGraphql, { address: APP_ADDRESS })
      .toPromise();

    // Initialize provider using AlchemyProvider and API key
    const provider = new ethers.AlchemyProvider("maticmum", API_KEY);

    // Initialize signer using private key and provider
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const signature = await signer.signMessage(
      challengeInfo.data.challenge.text
    );

    // Authenticate the user
    const authData = await baseClientUtil
      .mutation(authenticateGraphql, {
        address: APP_ADDRESS,
        signature: signature
      })
      .toPromise();

    // Extract accessToken from authentication response
    const {
      data: {
        authenticate: { accessToken }
      }
    } = authData;

    // Create and return authenticated client
    return createClient({
      url: PUBLIC_LENS_API_URL,
      fetchOptions: {
        headers: {
          "x-access-token": `Bearer ${accessToken}`
        }
      },
      exchanges: [cacheExchange, fetchExchange]
    });
  } catch (error) {
    // Return baseClientUtil if authentication fails
    return baseClientUtil;
  }
};

export default authenticatedClientUtil;
