import revokeAuthenticationLensService from "../../services/lens/revoke-authentication.lens.service";
import resetToDefaultStoreValueAuthenticationUtil from "./reset-to-default-store-value.authentication.util";
import setReloadsMethodsAuthenticationUtil from "./set-reloads-methods.authentication.util";

const logUserOutAuthenticationUtil = async () => {
  await revokeAuthenticationLensService();

  resetToDefaultStoreValueAuthenticationUtil();

  setReloadsMethodsAuthenticationUtil();
};

export default logUserOutAuthenticationUtil;
