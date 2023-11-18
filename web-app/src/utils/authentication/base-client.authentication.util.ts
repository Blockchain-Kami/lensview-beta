import { Client, createClient } from "@urql/core";
import { PUBLIC_LENS_API_URL } from "$env/static/public";
import { cacheExchange, fetchExchange } from "@urql/svelte";

const baseClientAuthenticationUtil: Client = createClient({
  url: PUBLIC_LENS_API_URL,
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network"
});

export default baseClientAuthenticationUtil;
