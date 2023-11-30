import profileQueryGraphql from "../../graphql/queries/profile.query.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const getProfileUsingIdLensService = async (id: string) => {
  console.log("getProfileUsingIdLensService id", id);

  return await baseClientAuthenticationUtil
    .query(profileQueryGraphql, {
      request: { forProfileId: id }
    })
    .toPromise();
};

export default getProfileUsingIdLensService;
