import { addressUserStore } from "../../stores/user/address.user.store";
import { idUserStore } from "../../stores/user/id.user.store";
import { profileUserStore } from "../../stores/user/profile.user.store";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import { localStorageKeys } from "../../config/app-constants.config";

const resetToDefaultStoreValueAuthenticationUtil = () => {
  addressUserStore.setUserAddress(null);
  idUserStore.setId(null);
  profileUserStore.setUserProfile(null);
  isLoggedInUserStore.setLoggedInStatus(false);
  localStorage.removeItem(localStorageKeys.authData);
};

export default resetToDefaultStoreValueAuthenticationUtil;
