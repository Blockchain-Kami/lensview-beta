import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import createProfileWithHandleMutationGraphql from "../../graphql/mutations/create-profile-with-handle.mutation.graphql";
import { addressUserStore } from "../../stores/user/address.user.store";

const createProfileWithHandleLensService = async (handle: string) => {
  console.log("createProfileWithHandleLensService handle", handle);

  let address;

  const unsub = addressUserStore.subscribe((_address) => {
    address = _address;
  });
  unsub();
  console.log("createProfileWithHandleLensService address", address);

  return await baseClientAuthenticationUtil
    .mutation(createProfileWithHandleMutationGraphql, {
      request: {
        handle: handle,
        to: address
      }
    })
    .toPromise();
};

export default createProfileWithHandleLensService;
