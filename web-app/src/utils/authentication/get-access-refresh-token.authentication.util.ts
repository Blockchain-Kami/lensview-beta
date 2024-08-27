import { localStorageKeys } from "../../config/app-constants.config";

const getAccessRefreshTokenAuthenticationUtil = () => {
  const ls = localStorage || window.localStorage;

  const authData = ls.getItem(localStorageKeys.authData);

  if (!authData) return null;

  return JSON.parse(authData);
};

export default getAccessRefreshTokenAuthenticationUtil;
