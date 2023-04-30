import baseClient from "./baseClient";
import refreshMutation from "../../graphql/refreshMutation";

const STORAGE_KEY = "LH_STORAGE_KEY";

// Simple function to say if the token is expired or not
export function isTokenExpired(exp: number) {
  if (!exp) return true;

  return Date.now() < exp * 1000;

}

// 1. Reading the access token from storage
export function readAccessToken() {
  // Make sure we're on a client-side environment
  if (typeof window === "undefined") return null;

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("LocalStorage is not available");
  }

  const data = ls.getItem(STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data) as {
    accessToken: string;
    refreshToken: string;
    exp: number;
  };
}

// 2. Setting the  access token in storage
export function setAccessToken(accessToken: string, refreshToken: string) {
  // 1. Parse the JWT token to get the expiration date
  const { exp } = parseJwt(accessToken);

  // 2. Set all three variables in side local storage using the storage key
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("LocalStorage is not available");
  }

  ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
}

// 3. Parse the JWT token that comes back and extract the exp date field
function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

type accessToken = string;

export async function refreshAuthToken(): Promise<accessToken | undefined> {
  const data = readAccessToken();

  if (!data) return
  try {
    const authData = await baseClient.mutation(refreshMutation, {
      refreshToken: data.refreshToken
    }).toPromise()

    if (!authData) return

    const { accessToken, refreshToken } = authData.data.refresh;

    setAccessToken(accessToken, refreshToken);

    return accessToken
  } catch (err) {
    console.log('error:', err)
  }
}
