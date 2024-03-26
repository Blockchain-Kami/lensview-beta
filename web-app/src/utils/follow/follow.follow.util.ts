import { signedTypeData, splitSignature } from "../ethers.util";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type {
  CreateFollowBroadcastItemResult,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import lensHubUtil from "../lens-hub.util";
import { profileUserStore } from "../../stores/user/profile.user.store";
import createFollowTypeDataLensService from "../../services/lens/create-follow-type-data.lens.service";

const { VITE_USE_GASLESS } = import.meta.env;

const followFollowUtil = async (profileId: string) => {
  let address = "";
  const unsub = profileUserStore.subscribe((_profile) => {
    if (_profile === null) return;
    address = _profile?.ownedBy?.address;
  });
  unsub();

  const { id, typedData } = (await createFollowTypeDataLensService({
    follow: [
      {
        profileId: profileId
      }
    ]
  })) as CreateFollowBroadcastItemResult;
  console.log("follow: result", { id, typedData });

  console.log("follow: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("follow: signature", signature);

  if (VITE_USE_GASLESS === "true") {
    const broadcastResult = (await broadcastOnchainRequestLensService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastTransactionIsComplete(broadcastResult, "follow");
  } else {
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHubUtil.followWithSig(
      typedData.value.followerProfileId,
      typedData.value.idsOfProfilesToFollow,
      typedData.value.followTokenIds,
      typedData.value.datas,
      {
        signer: address,
        v,
        r,
        s,
        deadline: typedData.value.deadline
      }
    );
    console.log("follow: tx hash", tx.hash);
    return tx.hash;
  }
};

export default followFollowUtil;
