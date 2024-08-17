import { idsAndHandlesUserStore } from "../../stores/user/ids-and-handles.user.store";
import getProfileUsingIdLensService from "../../services/lens/get-profile-using-id.lens.service";
import { profileUserStore } from "../../stores/user/profile.user.store";

const setProfileAuthenticationUtil = async () => {
  let id = "";
  const unsub = idsAndHandlesUserStore.subscribe((idsAndHandles) => {
    id = idsAndHandles[0].id;
  });
  unsub();

  if (id !== "") {
    try {
      const response = await getProfileUsingIdLensService(id);
      // console.log("getProfileUsingIdLensService response", response);
      if (response?.data?.profile) {
        profileUserStore.setUserProfile(response?.data?.profile);
      }
    } catch (error) {
      console.log("getProfileUsingIdLensService error", error);
      throw new Error("Failed to get profile");
    }
  }
};

export default setProfileAuthenticationUtil;
