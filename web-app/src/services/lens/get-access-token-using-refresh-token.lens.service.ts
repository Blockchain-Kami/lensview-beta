import refreshMutationGraphql from "../../graphql/mutations/refresh.mutation.graphql";
import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";

const getAccessTokenUsingRefreshTokenLensService = async (
  refreshToken: string
) => {
  console.log("refreshToken", refreshToken);
  return await baseClientAuthenticationUtil
    .mutation(refreshMutationGraphql, {
      request: {
        refreshToken: refreshToken
      }
    })
    .toPromise();
};

export default getAccessTokenUsingRefreshTokenLensService;
