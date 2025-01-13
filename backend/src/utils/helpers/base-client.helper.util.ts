import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";

import { LENS_API_URL } from "../../config/env.config.js";

const baseClientHelperUtil: Client = createClient({
  url: LENS_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Origin: "https://api.lensview.io" // Replace with your actual origin
    }
  },
  requestPolicy: "cache-and-network"
});

export default baseClientHelperUtil;
