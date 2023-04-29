import baseClient from './baseClient';
import authenticate from '../graphql/authenticate';
import userAddress from "../services/userAddress";
import challenge from "../graphql/challenge";
import { getSigner } from "./web3";

const userAuthentication = async () => {
  try{
    const challengeInfo = await baseClient.query(challenge, {userAddress}).toPromise();
    const signer = getSigner();
    const signature = await signer.signMessage(challengeInfo.data.challenge.text);
    const authData = await baseClient.mutation(authenticate, {userAddress, signature}).toPromise();

    /** Set the access token & refresh token in the local storage */
  }
  catch(err){
    console.log(err);
    throw err;
  }
}
