import { writable } from "svelte/store";

function manageIsLoggedIn() {
  const isLoggedIn = writable(false);

  return {
    subscribe: isLoggedIn.subscribe,
    setLoggedInStatus: (currentStatus: boolean) => {
      isLoggedIn.set(currentStatus);
    }
  };
}

export const isLoggedInUserStore = manageIsLoggedIn();
