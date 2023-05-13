import { writable } from "svelte/store";

function manageUserProfile() {
  const profile = writable();

  return {
    subscribe: profile.subscribe,
    setUserProfile: (fetchedProfile: string) => {
      profile.set(fetchedProfile);
    }
  };
}

export const userProfile = manageUserProfile();

