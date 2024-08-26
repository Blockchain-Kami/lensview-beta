import { Client, createClient } from "@urql/core";
import getAccessRefreshTokenAuthenticationUtil from "./get-access-refresh-token.authentication.util";
const { VITE_LENS_API_URL } = import.meta.env;

const authenticatedClientAuthenticationUtil = () => {
  const { accessToken } = getAccessRefreshTokenAuthenticationUtil();

  if (!accessToken) throw new Error("No access token found");

  const authenticatedClient: Client = createClient({
    url: VITE_LENS_API_URL,
    requestPolicy: "cache-and-network",
    fetchOptions: {
      headers: {
        "x-access-token": `Bearer ${accessToken}`
      }
    }
  });

  return authenticatedClient;
};

export default authenticatedClientAuthenticationUtil;
