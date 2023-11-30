import { Client, createClient } from "@urql/core";
import { PUBLIC_LENS_API_URL } from "$env/static/public";

const baseClientAuthenticationUtil: Client = createClient({
  url: PUBLIC_LENS_API_URL,
  requestPolicy: "cache-and-network"
});

export default baseClientAuthenticationUtil;
