import getChallengeInfoLensService from "../../services/lens/get-challenge-info.lens.service";
import { wagmiConfig } from "../web3modal.util";
import getAccessTokenUsingChallengeLensService from "../../services/lens/get-access-token-using-challenge.lens.service";
import { localStorageKeys } from "../../config/app-constants.config";
import updateLoggedInStatusAuthenticationUtil from "./update-logged-in-status.authentication.util";
import { signMessage } from "@wagmi/core";

const logUserInAuthenticationUtil = async (address: string, id: string) => {
  try {
    const challengeInfo = await getChallengeInfoLensService(address, id);

    if (!challengeInfo?.data?.challenge) return new Error("No challenge found");

    const signature = await signMessage(wagmiConfig, {
      message: challengeInfo.data.challenge.text
    });

    const authData = await getAccessTokenUsingChallengeLensService(
      challengeInfo?.data?.challenge?.id,
      signature
    );

    if (!authData.data?.authenticate) return new Error("No access token found");

    const ls = localStorage || window.localStorage;

    ls.setItem(
      localStorageKeys.authData,
      JSON.stringify(authData.data?.authenticate)
    );

    await updateLoggedInStatusAuthenticationUtil();
  } catch (error) {
    console.log("Error logging user in: " + error);
    throw new Error("Error logging user in");
  }
};

export default logUserInAuthenticationUtil;
