import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import challengeMutationGraphql from "../../graphql/mutations/challenge.mutation.graphql";

const getChallengeInfoLensService = async (address: string, id: string) => {
  console.log("getChallengeInfoLensService signedBy", address);
  console.log("getChallengeInfoLensService for", id);

  const { VITE_APP_ADDRESS } = import.meta.env;

  return await baseClientAuthenticationUtil
    .mutation(challengeMutationGraphql, {
      request: {
        accountOwner: {
          owner: address,
          account: id,
          app: VITE_APP_ADDRESS
        }
      }
    })
    .toPromise();
};

export default getChallengeInfoLensService;
