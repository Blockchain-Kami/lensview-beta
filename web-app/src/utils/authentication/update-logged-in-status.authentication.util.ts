import { localStorageKeys } from "../../config/app-constants.config";
import { addressUserStore } from "../../stores/user/address.user.store";
import { idUserStore } from "../../stores/user/id.user.store";
import { profileUserStore } from "../../stores/user/profile.user.store";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import getProfileUsingIdLensService from "../../services/lens/get-profile-using-id.lens.service";
import getAccessTokenUsingRefreshTokenLensService from "../../services/lens/get-access-token-using-refresh-token.lens.service";

const resetToDefaultStoreValue = () => {
  addressUserStore.setUserAddress(null);
  idUserStore.setId(null);
  profileUserStore.setUserProfile(null);
  isLoggedInUserStore.setLoggedInStatus(false);
};
const updateLoggedInStatusAuthenticationUtil = async () => {
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("LocalStorage is not available");
  }

  const authData = ls.getItem(localStorageKeys.authData);

  if (!authData) {
    resetToDefaultStoreValue();
    return;
  }

  const parsedAuthData = JSON.parse(authData);

  if (!parsedAuthData) {
    resetToDefaultStoreValue();
    return;
  }

  const { accessToken, refreshToken } = parsedAuthData;

  const isAccessTokenValid = isTokenValid(accessToken);

  if (!isAccessTokenValid) {
    const isRefreshTokenValid = isTokenValid(refreshToken);

    if (!isRefreshTokenValid) {
      resetToDefaultStoreValue();
      return;
    }

    try {
      await updateAccessTokenUsingRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);
      throw new Error("Error while updating access token using refresh token");
    }
  } else {
    const { id, evmAddress } = parseJwt(accessToken);
    idUserStore.setId(id);
    addressUserStore.setUserAddress(evmAddress);

    try {
      const response = await getProfileUsingIdLensService(id);
      profileUserStore.setUserProfile(response?.data?.profile);
      isLoggedInUserStore.setLoggedInStatus(true);
    } catch (error) {
      resetToDefaultStoreValue();
      console.log(error);
      throw new Error("Error while getting profile details");
    }
  }
};

export default updateLoggedInStatusAuthenticationUtil;

const isTokenValid = (token: string) => {
  const { exp } = parseJwt(token);

  if (!exp) return false;

  return Date.now() < exp * 1000;
};

const updateAccessTokenUsingRefreshToken = async (refreshToken: string) => {
  try {
    const response = await getAccessTokenUsingRefreshTokenLensService(
      refreshToken
    );

    localStorage.setItem(
      localStorageKeys.authData,
      JSON.stringify(response?.data?.refresh)
    );
    await updateLoggedInStatusAuthenticationUtil();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const parseJwt = (token: string) => {
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
};
