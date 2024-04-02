import { waitUntilLensManagerTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type {
  LensProfileManagerRelayError,
  RelaySuccess
} from "../../gql/graphql";
import createUnfollowWithLensManagerLensService from "../../services/lens/create-unfollow-with-lens-manager.lens.service";

export const unfollowLensProfileManagerFollowUtil = async (
  profileId: string
) => {
  const result = (await createUnfollowWithLensManagerLensService({
    unfollow: [profileId]
  })) as RelaySuccess | LensProfileManagerRelayError;
  console.log("unfollow lens profile manager: result", result);
  await waitUntilLensManagerTransactionIsComplete(result, "follow");
};

export default unfollowLensProfileManagerFollowUtil;
