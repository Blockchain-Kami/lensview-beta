import baseClient from './baseClient';
import authenticate from '../graphql/authenticate';
import {userAddress} from "../services/userAddress";
import challenge from "../graphql/challenge";
import { getSigner } from "./web3";
import { setAccessToken } from "./accessTokenHelper";
import { APP_ADDRESS } from '$env/static/private';


export const userAuthentication = async () => {
  try{
    let address;
    const unsubscribe = userAddress.subscribe( res => {address = res;})
    unsubscribe();

    const challengeInfo = await baseClient.query(challenge, {address}).toPromise();
    const signer = getSigner();
    const signature = await signer.signMessage(challengeInfo.data.challenge.text);
    const authData = await baseClient.mutation(authenticate, {address, signature}).toPromise();

    /** Set the access token, expiration date & refresh token in the local storage */
    setAccessToken(authData.data.authenticate.accessToken, authData.data.authenticate.refreshToken);
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

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
