import { writable } from "svelte/store";
import type { Profile } from "../../gql/graphql";

function manageProfile() {
  const profile = writable<Profile | null>(null);

  return {
    subscribe: profile.subscribe,
    setUserProfile: (fetchedProfile: Profile | null) => {
      profile.set(fetchedProfile);
    }
  };
}

export const profileUserStore = manageProfile();
