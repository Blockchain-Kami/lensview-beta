import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import { LENS_API_URL } from "../../config/env.config";

const getBaseClientHelperUtil: Client = createClient({
  url: LENS_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network"
});

export default getBaseClientHelperUtil;
