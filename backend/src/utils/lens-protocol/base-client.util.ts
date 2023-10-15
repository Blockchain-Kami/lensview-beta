import { cacheExchange, Client, createClient, fetchExchange } from "@urql/core";
import dotenv from "dotenv";
import { PUBLIC_LENS_API_URL } from "../../config/env.config";
dotenv.config();

const baseClientUtil: Client = createClient({
  url: PUBLIC_LENS_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network"
});

export default baseClientUtil;
