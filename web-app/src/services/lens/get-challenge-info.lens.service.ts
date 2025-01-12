import baseClientAuthenticationUtil from "../../utils/authentication/base-client.authentication.util";
import challengeMutationGraphql from "../../graphql/mutations/challenge.mutation.graphql";

const getChallengeInfoLensService = async (address: string, id: string) => {
  console.log("getChallengeInfoLensService signedBy", address);
  console.log("getChallengeInfoLensService for", id);

  return await baseClientAuthenticationUtil
    .query(challengeMutationGraphql, {
      request: {
        accountOwner: {
          owner: address,
          account: id,
          app: "0xe5439696f4057aF073c0FB2dc6e5e755392922e1"
        }
      }
    })
    .toPromise();
};

export default getChallengeInfoLensService;
