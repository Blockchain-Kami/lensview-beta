import { writable } from "svelte/store";

function manageUserAddress() {
  const address = writable<string | null>(null);

  return {
    subscribe: address.subscribe,
    setUserAddress: (fetchedAddress: string | null) => {
      address.set(fetchedAddress);
    }
  };
}

export const addressUserStore = manageUserAddress();
