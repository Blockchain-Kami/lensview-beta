import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import { PUBLIC_LENS_API_URL } from "../../config/env.config";

const getBaseClientHelperUtil: Client = createClient({
  url: PUBLIC_LENS_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network"
});

export default getBaseClientHelperUtil;
