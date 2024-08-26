import { localStorageKeys } from "../../config/app-constants.config";

const getAccessRefreshTokenAuthenticationUtil = () => {
  const ls = localStorage || window.localStorage;

  const authData = ls.getItem(localStorageKeys.authData);

  if (!authData) throw new Error("No auth data found");

  return JSON.parse(authData);
};

export default getAccessRefreshTokenAuthenticationUtil;
