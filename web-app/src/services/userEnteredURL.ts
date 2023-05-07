import { writable } from "svelte/store";

function manageUserEnteredURL() {
  const url = writable();

  return {
    subscribe: url.subscribe,
    set: (enteredURL: string) => {
      url.set(enteredURL);
    }
  };
}

export const userEnteredURL = manageUserEnteredURL();

