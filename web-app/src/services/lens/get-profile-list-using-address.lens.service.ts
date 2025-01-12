import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import accountsAvailableQueryGraphql from "../../graphql/queries/accounts-available.query.graphql";

const getProfileListUsingAddressLensService = async (address: string) => {
  console.log("getProfileListUsingAddressLensService address", address);

  const response = await baseClientAuthenticationUtil
    .query(accountsAvailableQueryGraphql, {
      request: {
        managedBy: address
      }
    })
    .toPromise();

  return response.data?.accountsAvailable?.items;
};

export default getProfileListUsingAddressLensService;
