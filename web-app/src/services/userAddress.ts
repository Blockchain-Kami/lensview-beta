import { writable } from "svelte/store";

function manageUserAddress() {
  const address = writable();

  return {
    subscribe: address.subscribe,
    setUserAddress: (fetchedAddress: string) => {
      address.set(fetchedAddress);
    }
  };
}

export const userAddress = manageUserAddress();
