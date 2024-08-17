import profileQueryGraphql from "../../graphql/queries/profile.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";

const getProfileUsingIdLensService = async (id: string) => {
  // console.log("getProfileUsingIdLensService id", id);

  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });

  unsub();

  if (isUserLoggedIn) {
    return await authenticatedClientAuthenticationUtil()
      .query(profileQueryGraphql, {
        request: { forProfileId: id }
      })
      .toPromise();
  } else {
    return await baseClientAuthenticationUtil
      .query(profileQueryGraphql, {
        request: { forProfileId: id }
      })
      .toPromise();
  }
};

export default getProfileUsingIdLensService;
