import { PUBLIC_LENS_API_URL } from "$env/static/public";
import { Client, createClient } from "@urql/core";
import { profileUserStore } from "../../stores/user/profile.user.store";
import isValidAccessTokenPresentInLocalStorageAuthenticationUtil from "./is-valid-access-token-present-in-local-storage.authentication.util";

const authenticatedClientAuthenticationUtil = () => {
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("LocalStorage is not available");
  }

  if (!isValidAccessTokenPresentInLocalStorageAuthenticationUtil()) {
    throw new Error("Invalid access token present in local storage");
  }

  const idsAuthData = ls.getItem("IDS_AUTH_DATA");

  let id: string | null = null;
  const unsub = profileUserStore.subscribe((_profile) => {
    id = _profile?.id;
  });
  unsub();

  if (!idsAuthData) throw new Error("No ids auth data found");

  if (!id) throw new Error("No profile found");

  const accessToken = JSON.parse(idsAuthData)[id].accessToken;

  if (!accessToken) throw new Error("No access token found");

  const authenticatedClient: Client = createClient({
    url: PUBLIC_LENS_API_URL,
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
