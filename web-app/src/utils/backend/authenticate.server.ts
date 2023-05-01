import authenticate from '../../graphql/authenticate';
import challenge from "../../graphql/challenge";
import { getSigner } from "../web3";
import { APP_ADDRESS } from '$env/static/private';
//TODO : Update this with backend client which may be appolo client
import baseClient from '../frontend/baseClient';

export const appAuthentication = async () => {
  try{
    const address = APP_ADDRESS;
    const challengeInfo = await baseClient.query(challenge, {address}).toPromise();
    const signer = getSigner();
    const signature = await signer.signMessage(challengeInfo.data.challenge.text);
    const authData = await baseClient.mutation(authenticate, {address, signature}).toPromise();

    return authData.data.authenticate.accessToken;
  }
  catch(err){
    console.log("Error in authenticating the app");
    throw err;
  }
}
