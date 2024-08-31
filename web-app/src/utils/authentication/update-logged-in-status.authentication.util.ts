import { localStorageKeys } from "../../config/app-constants.config";
import { addressUserStore } from "../../stores/user/address.user.store";
import { idUserStore } from "../../stores/user/id.user.store";
import { profileUserStore } from "../../stores/user/profile.user.store";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import getProfileUsingIdLensService from "../../services/lens/get-profile-using-id.lens.service";
import getAccessTokenUsingRefreshTokenLensService from "../../services/lens/get-access-token-using-refresh-token.lens.service";
import getAccessRefreshTokenAuthenticationUtil from "./get-access-refresh-token.authentication.util";
import parseJwtAuthenticationUtil from "./parse-jwt.authentication.util";
import setReloadsMethodsAuthenticationUtil from "./set-reloads-methods.authentication.util";
import resetToDefaultStoreValueAuthenticationUtil from "./reset-to-default-store-value.authentication.util";

let updateAccessTokenTimeoutId: string | number | NodeJS.Timeout | undefined;

const updateLoggedInStatusAuthenticationUtil = async () => {
  const parsedAuthData = getAccessRefreshTokenAuthenticationUtil();

  if (!parsedAuthData) {
    resetToDefaultStoreValueAuthenticationUtil();
    return;
  }

  const { accessToken, refreshToken } = parsedAuthData;

  const isAccessTokenValid = isTokenValid(accessToken);

  if (!isAccessTokenValid) {
    const isRefreshTokenValid = isTokenValid(refreshToken);

    if (!isRefreshTokenValid) {
      resetToDefaultStoreValueAuthenticationUtil();
      return;
    }

    try {
      await updateAccessTokenUsingRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);
      throw new Error("Error while updating access token using refresh token");
    }
  } else {
    const { id, evmAddress } = parseJwtAuthenticationUtil(accessToken);
    idUserStore.setId(id);
    addressUserStore.setUserAddress(evmAddress);

    try {
      isLoggedInUserStore.setLoggedInStatus(true);
      await getProfilesAndUpdateData(id);
      updateAccessTokenAfterEvery30Mins();
    } catch (error) {
      resetToDefaultStoreValueAuthenticationUtil();
      console.log(error);
      throw new Error("Error while getting profile details");
    }
  }
};

export default updateLoggedInStatusAuthenticationUtil;

const isTokenValid = (token: string) => {
  const { exp } = parseJwtAuthenticationUtil(token);

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

const getProfilesAndUpdateData = async (idParam: string) => {
  let id: string | null = null;
  const unsub = profileUserStore.subscribe((_profile) => {
    id = _profile?.id;
  });
  unsub();

  /**
   * We are only updating profile store and calling API if
   * 1. User reload website
   * 2. Switch profile
   */
  if (!id || id !== idParam) {
    const response = await getProfileUsingIdLensService(idParam);
    profileUserStore.setUserProfile(response?.data?.profile);
    console.log("Reload called");
    setReloadsMethodsAuthenticationUtil();
  }
};

const updateAccessTokenAfterEvery30Mins = () => {
  clearTimeout(updateAccessTokenTimeoutId);

  updateAccessTokenTimeoutId = setTimeout(async () => {
    console.log(
      "updateAccessTokenTimeoutId called for : ",
      updateAccessTokenTimeoutId
    );
    await updateLoggedInStatusAuthenticationUtil();
  }, 1001 * 60 * 30);

  console.log("updateAccessTokenTimeoutId : ", updateAccessTokenTimeoutId);
};
