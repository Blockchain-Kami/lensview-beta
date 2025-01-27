import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import accountsAvailableQueryGraphql from "../../graphql/queries/accounts-available.query.graphql";
import type { ProfileManagedLensModel } from "../../models/lens/profile-managed.lens.model";

const getProfileListUsingAddressLensService = async (address: string) => {
  console.log("getProfileListUsingAddressLensService address", address);

  const response = await baseClientAuthenticationUtil
    .query(accountsAvailableQueryGraphql, {
      request: {
        managedBy: address
      }
    })
    .toPromise();

  return response.data?.accountsAvailable?.items as ProfileManagedLensModel[];
};

export default getProfileListUsingAddressLensService;
