import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import authenticateMutationGraphql from "../../graphql/mutations/authenticate.mutation.graphql";

const getAccessTokenUsingChallengeLensService = async (
  ChallengeId: string,
  signature: string
) => {
  // console.log("getAccessTokenUsingChallengeLensService id", ChallengeId);
  // console.log("getAccessTokenUsingChallengeLensService signature", signature);

  return await baseClientAuthenticationUtil
    .mutation(authenticateMutationGraphql, {
      request: {
        id: ChallengeId,
        signature: signature
      }
    })
    .toPromise();
};

export default getAccessTokenUsingChallengeLensService;
