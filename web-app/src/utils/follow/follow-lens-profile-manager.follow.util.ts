import createFollowWithLensManagerLensService from "../../services/lens/create-follow-with-lens-manager.lens.service";
import { waitUntilLensManagerTransactionIsComplete } from "../transaction/wait-until-complete.transaction.util";
import type {
  LensProfileManagerRelayError,
  RelaySuccess
} from "../../gql/graphql";

export const followLensProfileManagerFollowUtil = async (profileId: string) => {
  const result = (await createFollowWithLensManagerLensService({
    follow: [
      {
        profileId: profileId
      }
    ]
  })) as RelaySuccess | LensProfileManagerRelayError;
  // console.log("follow lens profile manager: result", result);
  await waitUntilLensManagerTransactionIsComplete(result, "follow");
};

export default followLensProfileManagerFollowUtil;
