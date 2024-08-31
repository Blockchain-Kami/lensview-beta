import profileManagedQueryGraphql from "../../graphql/queries/profile-managed.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import type { ProfileManagedLensModel } from "../../models/lens/profile-managed.lens.model";

const getProfileListUsingAddressLensService = async (address: string) => {
  console.log("getProfileListUsingAddressLensService address", address);

  const response = await baseClientAuthenticationUtil
    .query(profileManagedQueryGraphql, {
      request: {
        for: address
      }
    })
    .toPromise();

  return response.data?.profilesManaged?.items as ProfileManagedLensModel[];
};

export default getProfileListUsingAddressLensService;
