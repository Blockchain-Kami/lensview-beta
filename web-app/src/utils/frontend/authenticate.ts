import baseClient from "./baseClient";
import authenticate from "../../graphql/authenticate";
import { userAddress } from "../../services/userAddress";
import challenge from "../../graphql/challenge";
import { getSigner } from "../web3";
import { setAccessToken } from "./accessTokenHelper";

export const userAuthentication = async () => {
  try {
    let address;
    const unsubscribe = userAddress.subscribe(res => {
      address = res;
    });
    unsubscribe();

    const challengeInfo = await baseClient.query(challenge, { address }).toPromise();
    console.log("Challenge Info: ", challengeInfo);
    const signer = getSigner();
    const signature = await signer.signMessage(challengeInfo.data.challenge.text);
    const authData = await baseClient.mutation(authenticate, { address, signature }).toPromise();

    /** Set the access token, expiration date & refresh token in the local storage */
    setAccessToken(authData.data.authenticate.accessToken, authData.data.authenticate.refreshToken);
  }
  catch(err){
    console.log(err);
    throw err;
  }
}
