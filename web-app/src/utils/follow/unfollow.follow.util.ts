import { signedTypeData, splitSignature } from "../ethers.util";
import broadcastOnchainRequestLensService from "../../services/lens/broadcast-onchain-request.lens.service";
import { waitUntilBroadcastTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type {
  CreateUnfollowBroadcastItemResult,
  RelayError,
  RelaySuccess
} from "../../gql/graphql";
import lensHubUtil from "../lens-hub.util";
import { profileUserStore } from "../../stores/user/profile.user.store";
import createUnfollowTypeDataLensService from "../../services/lens/create-unfollow-type-data.lens.service";

const { VITE_USE_GASLESS } = import.meta.env;

const unfollowFollowUtil = async (profileId: string) => {
  let address = "";
  const unsub = profileUserStore.subscribe((_profile) => {
    if (_profile === null) return;
    address = _profile?.ownedBy?.address;
  });
  unsub();

  const { id, typedData } = (await createUnfollowTypeDataLensService({
    unfollow: [profileId]
  })) as CreateUnfollowBroadcastItemResult;

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );

  if (VITE_USE_GASLESS === "true") {
    const broadcastResult = (await broadcastOnchainRequestLensService({
      id,
      signature
    })) as RelaySuccess | RelayError;

    await waitUntilBroadcastTransactionIsComplete(broadcastResult, "unfollow");
  } else {
    const { v, r, s } = splitSignature(signature);

    const tx = await lensHubUtil.unfollowWithSig(
      typedData.value.unfollowerProfileId,
      typedData.value.idsOfProfilesToUnfollow,
      {
        signer: address,
        v,
        r,
        s,
        deadline: typedData.value.deadline
      }
    );
    console.log("unfollow: tx hash", tx.hash);
    return tx.hash;
  }
};

export default unfollowFollowUtil;
