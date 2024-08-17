import { idsAndHandlesUserStore } from "../../stores/user/ids-and-handles.user.store";
import getAccessTokenUsingRefreshTokenLensService from "../../services/lens/get-access-token-using-refresh-token.lens.service";

const isValidAccessTokenPresentInLocalStorageAuthenticationUtil = async () => {
  let id = "";
  const unsub = idsAndHandlesUserStore.subscribe((idsAndHandles) => {
    id = idsAndHandles[0].id;
  });
  unsub();

  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("LocalStorage is not available");
  }

  const idsAuthData = ls.getItem("IDS_AUTH_DATA");

  if (!idsAuthData) return false;

  const parsedIdsAuthData = JSON.parse(idsAuthData);
  // console.log("parsedIdsAuthData", parsedIdsAuthData);

  if (!parsedIdsAuthData?.[id]) return false;

  const { accessToken, refreshToken } = parsedIdsAuthData[id];

  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);

  const isAccessTokenExpired = await isAccessTokenExpiredInLocalStorage(
    accessToken,
    refreshToken,
    id
  );

  return !isAccessTokenExpired;
};

export default isValidAccessTokenPresentInLocalStorageAuthenticationUtil;

const isAccessTokenExpiredInLocalStorage = async (
  accessToken: string,
  refreshToken: string,
  id: string
) => {
  const accessTokenExp = parseJwtToGetExpirationDate(accessToken);
  // console.log("accessTokenExp", accessTokenExp);

  // console.log("isTokenExpired(accessTokenExp)", isTokenExpired(accessTokenExp));
  if (!isTokenExpired(accessTokenExp)) return false;

  const refreshTokenExp = parseJwtToGetExpirationDate(refreshToken);
  console.log("refreshTokenExp", refreshTokenExp);

  console.log(
    "isTokenExpired(refreshTokenExp)",
    isTokenExpired(refreshTokenExp)
  );
  if (isTokenExpired(refreshTokenExp)) return true;

  try {
    await updateAccessTokenUsingRefreshToken(refreshToken, id);
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const parseJwtToGetExpirationDate = (token: string) => {
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

  return JSON.parse(jsonPayload)?.exp;
};

const isTokenExpired = (exp: number) => {
  if (!exp) return true;

  return Date.now() >= exp * 1000;
};

const updateAccessTokenUsingRefreshToken = async (
  refreshToken: string,
  id: string
) => {
  try {
    const response = await getAccessTokenUsingRefreshTokenLensService(
      refreshToken
    );
    if (response?.data?.refresh) {
      console.log("response.data.refresh", response.data.refresh);
      const parsedPrevIdsAuthData = JSON.parse(
        localStorage.getItem("IDS_AUTH_DATA") as string
      );
      const updatedIdsAuthData = {
        ...parsedPrevIdsAuthData,
        [id]: response.data.refresh
      };
      localStorage.setItem("IDS_AUTH_DATA", JSON.stringify(updatedIdsAuthData));
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
