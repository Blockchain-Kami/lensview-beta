import { writable } from "svelte/store";
import type { ProfileQuery } from "../../gql/graphql";
import type { OperationResult } from "@urql/core";

type ProfileStoreType = ProfileQuery | null;

function manageProfile() {
  const profile = writable<ProfileStoreType>(null);

  return {
    subscribe: profile.subscribe,
    setUserProfile: (fetchedProfile: OperationResult<ProfileQuery> | null) => {
      profile.set(fetchedProfile?.data ?? null);
    }
  };
}

export const profileUserStore = manageProfile();
