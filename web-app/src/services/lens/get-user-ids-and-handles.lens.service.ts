import profileManagedQueryGraphql from "../../graphql/queries/profile-managed.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const getUserIdsAndHandlesLensService = async (address: string) => {
  console.log("getUserIdsAndHandlesLensService address", address);
  return await baseClientAuthenticationUtil
    .query(profileManagedQueryGraphql, {
      request: {
        for: address
      }
    })
    .toPromise();
};

export default getUserIdsAndHandlesLensService;
