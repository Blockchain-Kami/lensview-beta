import { addressUserStore } from "../../stores/user/address.user.store";
import getChallengeInfoLensService from "../../services/lens/get-challenge-info.lens.service";
import { idsAndHandlesUserStore } from "../../stores/user/ids-and-handles.user.store";
import getSignerWeb3Util from "../web3/get-signer.web3.util";
import getAccessTokenUsingChallengeLensService from "../../services/lens/get-access-token-using-challenge.lens.service";

const retrieveAccessTokenAuthenticationUtil = async () => {
  try {
    let address;
    const addressUserStoreUnsub = addressUserStore.subscribe((_address) => {
      address = _address;
    });
    addressUserStoreUnsub();
    if (!address) return new Error("No address found");

    let id;

    const idsAndHandlesUserStoreUnsub = idsAndHandlesUserStore.subscribe(
      (idsAndHandle) => {
        id = idsAndHandle[0].id;
      }
    );
    idsAndHandlesUserStoreUnsub();
    if (!id) return new Error("No id found");

    const challengeInfo = await getChallengeInfoLensService(address, id);

    if (!challengeInfo?.data?.challenge) return new Error("No challenge found");

    const signer = getSignerWeb3Util();
    const signature = await signer.signMessage(
      challengeInfo.data.challenge.text
    );

    const authData = await getAccessTokenUsingChallengeLensService(
      challengeInfo?.data?.challenge?.id,
      signature
    );

    if (!authData.data?.authenticate) return new Error("No access token found");

    if (authData.data?.authenticate) {
      const parsedPrevIdsAuthData = JSON.parse(
        localStorage.getItem("IDS_AUTH_DATA") as string
      );
      const updatedIdsAuthData = {
        ...parsedPrevIdsAuthData,
        [id]: authData.data?.authenticate
      };

      localStorage.setItem("IDS_AUTH_DATA", JSON.stringify(updatedIdsAuthData));
    }
  } catch (error) {
    console.log("retrieveAccessTokenAuthenticationUtil error", error);
    throw new Error("Failed to retrieve access token");
  }
};

export default retrieveAccessTokenAuthenticationUtil;
