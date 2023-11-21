import type {
  CreateOnchainPostBroadcastItemResult,
  OnchainPostRequest,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import { PUBLIC_APP_LENS_ID } from "$env/static/public";
import { uploadIpfs } from "../ipfs.util";
import createOnchainPostTypedDataLensService from "../../services/lens/create-onchain-post-typed-data.lens.service";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import { signedTypeData } from "../ethers.util";

const postOnChain = async () => {
  if (!PUBLIC_APP_LENS_ID) {
    throw new Error("Must define PROFILE_ID in the .env to run this");
  }

  const ipfsResultUri = await uploadIpfs(
    JSON.stringify({
      $schema:
        "https://json-schemas.lens.dev/publications/text-only/3.0.0.json",
      name: "My text3",
      description: "My text Description",
      external_url: "https://mytext.com",
      image: "https://text.com/image.png",
      lens: {
        title: "My text",
        id: "1030ee6e-51cb-4a09-a74a-abdccc6ef890",
        locale: "en-US",
        mainContentFocus: "TEXT_ONLY",
        content: "My text Content",
        tags: ["text"],
        appId: "my-app-id"
      }
    })
  );
  console.log("post onchain: ipfs result uri", ipfsResultUri);

  const request: OnchainPostRequest = {
    contentURI: ipfsResultUri
    // you can play around with open actions modules here all request
    // objects are in `publication-open-action-options.ts`
    // openActionModules: [simpleCollectAmountAndLimit(address)],
    //
    // you can play around with reference modules here
    // all request objects are in `publication-reference-module-options.ts`,
    // referenceModule: referenceModuleFollowOnly,
  };

  const { id, typedData } = (await createOnchainPostTypedDataLensService(
    request
  )) as CreateOnchainPostBroadcastItemResult;
  console.log("post onchain: result", { id, typedData });

  console.log("post onchain: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("post onchain: signature", signature);

  // if (USE_GASLESS) {
  const broadcastResult = (await broadcastOnchainRequestLensService({
    id,
    signature
  })) as RelaySuccess | RelayError;

  await waitUntilBroadcastTransactionIsComplete(broadcastResult, "post");
  // } else {
  //   const { v, r, s } = splitSignature(signature);
  //
  //   const tx = await lensHub.postWithSig(
  //     {
  //       profileId: typedData.value.profileId,
  //       contentURI: typedData.value.contentURI,
  //       actionModules: typedData.value.actionModules,
  //       actionModulesInitDatas: typedData.value.actionModulesInitDatas,
  //       referenceModule: typedData.value.referenceModule,
  //       referenceModuleInitData: typedData.value.referenceModuleInitData
  //     },
  //     {
  //       signer: address,
  //       v,
  //       r,
  //       s,
  //       deadline: typedData.value.deadline
  //     }
  //   );
  //   console.log("post onchain: tx hash", tx.hash);
  // }
};

export default postOnChain;
