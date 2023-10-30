import { userProfile } from "../../services/profile";
import uploadToIPFS from "./uploadToIPFS";
import signCreateCommentTypedData from "./signCreateCommentTypedData";
import { getSigner } from "../web3";
import { ethers, utils } from "ethers";
import { PUBLIC_LENS_HUB_CONTRACT_ADDRESS } from "$env/static/public";
import LENSHUB from "../.././abi/lenshub.json";

function splitSignature(signature: string) {
  return utils.splitSignature(signature);
}

const postAPublication = async (userEnteredContent: string, pubId: string) => {
  let profile;
  const unsub = userProfile.subscribe((value) => {
    profile = value;
  });
  unsub();

  console.log("profile: ", profile);

  const contentURI = await uploadToIPFS(profile.id, userEnteredContent);
  const createCommentRequest = {
    profileId: profile.id,
    publicationId: pubId,
    contentURI,
    collectModule: {
      freeCollectModule: { followerOnly: true }
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  };

  try {
    const signedResult = await signCreateCommentTypedData(createCommentRequest);
    const typedData = signedResult.result.typedData;
    const { v, r, s } = splitSignature(signedResult.signature);
    const signer = await getSigner();

    const contract = new ethers.Contract(
      PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
      LENSHUB,
      signer
    );

    const tx = await contract.commentWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      profileIdPointed: typedData.value.profileIdPointed,
      pubIdPointed: typedData.value.pubIdPointed,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      referenceModuleData: typedData.value.referenceModuleData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline
      }
    });

    await tx.wait();

    console.log("successfully created Comment: tx hash", tx.hash);
    console.log("successfully created Comment: tx hash", JSON.stringify(tx));
    return tx;
  } catch (err) {
    console.log("error: ", err);
    throw err;
  }
};

export default postAPublication;
