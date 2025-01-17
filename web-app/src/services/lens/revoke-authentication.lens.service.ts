import authenticatedClientAuthenticationUtil from "../../utils/authentication/authenticated-client.authentication.util";
import revokeAuthenticationMutationGraphql from "../../graphql/mutations/revoke-authentication.mutation.graphql";
import getAccessRefreshTokenAuthenticationUtil from "../../utils/authentication/get-access-refresh-token.authentication.util";
import parseJwtAuthenticationUtil from "../../utils/authentication/parse-jwt.authentication.util";

const revokeAuthenticationLensService = async () => {
  const { accessToken } = getAccessRefreshTokenAuthenticationUtil();

  if (!accessToken) throw new Error("No access token found");

  const { sid } = parseJwtAuthenticationUtil(accessToken);

  if (!sid) throw new Error("No authorization id found");

  return authenticatedClientAuthenticationUtil()
    .mutation(revokeAuthenticationMutationGraphql, {
      request: { authenticationId: sid }
    })
    .toPromise();
};

export default revokeAuthenticationLensService;
