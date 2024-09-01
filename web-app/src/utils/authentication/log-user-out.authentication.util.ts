import revokeAuthenticationLensService from "../../services/lens/revoke-authentication.lens.service";
import resetToDefaultStoreValueAuthenticationUtil from "./reset-to-default-store-value.authentication.util";
import setReloadsMethodsAuthenticationUtil from "./set-reloads-methods.authentication.util";
import { disconnect } from "@wagmi/core";
import { wagmiConfig } from "../web3modal.util";

const logUserOutAuthenticationUtil = async () => {
  await revokeAuthenticationLensService();

  await disconnect(wagmiConfig);

  resetToDefaultStoreValueAuthenticationUtil();

  setReloadsMethodsAuthenticationUtil();
};

export default logUserOutAuthenticationUtil;
