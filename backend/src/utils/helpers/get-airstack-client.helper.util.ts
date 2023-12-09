import { GraphQLClient } from "graphql-request";
// import { createClient, Client, cacheExchange, fetchExchange } from "@urql/core";
import {
  PUBLIC_AIRSTACK_API_URL,
  AIRSTACK_API_KEY
} from "../../config/env.config";

// const getAirStackClientHelperUtil: Client = createClient({
//   url: PUBLIC_AIRSTACK_API_URL,
//   fetchOptions: {
//     headers: {
//       Authorization: AIRSTACK_API_KEY,
//       "Content-Type": "application/json"
//     }
//   },
//   exchanges: [cacheExchange, fetchExchange],
//   requestPolicy: "cache-and-network"
// });

const getAirStackClientHelperUtil = new GraphQLClient(PUBLIC_AIRSTACK_API_URL, {
  headers: {
    Authorization: AIRSTACK_API_KEY // Add API key to Authorization header
  }
});

export default getAirStackClientHelperUtil;
