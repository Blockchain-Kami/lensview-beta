import { addressUserStore } from "../../stores/user/address.user.store";
import getUserIdsAndHandlesLensService from "../../services/lens/get-user-ids-and-handles.lens.service";
import type { IdAndHandleModel } from "../../models/id-and-handle.model";
import { idsAndHandlesUserStore } from "../../stores/user/ids-and-handles.user.store";
import isValidAccessTokenPresentInLocalStorageAuthenticationUtil from "./is-valid-access-token-present-in-local-storage.authentication.util";

/**
 * Steps to validate if access token is present in local storage
 * 1. Get IDs and handles from Lens
 * 2. If IDs and handles are present, check if local storage contains access token & refresh token
 * 3. If access token & refresh token are present, check if access token is expired
 * 4. If the access token is not expired, return true
 * 5. If access token is expired, check if refresh token is expired
 * 6. If refresh token is not expired, update access token using refresh token
 * 7. If the refresh token is expired, return false
 *
 * After running this function, we will have
 * 1. If IDs and handles are present, if address is having any handle created on Lens
 * 2. If IDs and handles are present, then access token in local storage will also
 * get updated if refresh token is not expired
 */
const isValidAccessTokenPresentInLsForAddressAuthenticationUtil = async () => {
  let address: string | null = null;

  const unsub = addressUserStore.subscribe((_address) => {
    address = _address;
  });
  unsub();

  if (!address) return false;

  try {
    const isAbleToStoreIDsAndHandles = await ableToStoreIDsAndHandles(address);
    if (isAbleToStoreIDsAndHandles) {
      // console.log("able to store ids and handles");
      return isValidAccessTokenPresentInLocalStorageAuthenticationUtil();
    } else {
      return false;
    }
  } catch (error) {
    const errorDetails = {
      position: "top-right",
      heading: "Error while fetching handle",
      description: "Please try again to login",
      type: "cross",
      removeAfter: 10000
    };
    throw new Error(JSON.stringify(errorDetails));
  }
};

export default isValidAccessTokenPresentInLsForAddressAuthenticationUtil;

const ableToStoreIDsAndHandles = async (address: string) => {
  const response = await getUserIdsAndHandlesLensService(address);
  const profilesManagedItems = response?.data?.profilesManaged?.items;

  console.log("profilesManagedItems : " + JSON.stringify(profilesManagedItems));

  if (
    !profilesManagedItems ||
    (profilesManagedItems && profilesManagedItems.length === 0)
  ) {
    idsAndHandlesUserStore.setUserIDsAndHandles([]);
    return false;
  } else {
    const idsAndHandles: IdAndHandleModel[] = [];

    for (let i = 0; i < profilesManagedItems.length; i++) {
      idsAndHandles.push({
        id: profilesManagedItems[i].id,
        handle: profilesManagedItems[i]?.handle?.fullHandle
      });
    }

    idsAndHandlesUserStore.setUserIDsAndHandles(idsAndHandles);
    return true;
  }
};
