import { isLoggedInUserStore } from "../../stores/user/is-logged-in.user.store";
import { AppReactionType } from "../../config/app-constants.config";

const getReactionBasedOnLoginStatusHelperUtil = (
  hasUpVoted: boolean,
  hasDownVoted: boolean
) => {
  let isUserLoggedIn = false;
  const unsub = isLoggedInUserStore.subscribe((status) => {
    isUserLoggedIn = status;
  });
  unsub();

  if (!isUserLoggedIn) {
    return AppReactionType.NoReaction;
  } else {
    if (hasUpVoted) {
      return AppReactionType.UpVote;
    } else if (hasDownVoted) {
      return AppReactionType.DownVote;
    } else {
      return AppReactionType.NoReaction;
    }
  }
};

export default getReactionBasedOnLoginStatusHelperUtil;
