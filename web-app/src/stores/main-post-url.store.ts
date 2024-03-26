import { writable } from "svelte/store";

function manageMainPostUrl() {
  const mainPostUrl = writable<string>("empty");

  return {
    subscribe: mainPostUrl.subscribe,
    setMainPostUrl: (fetchedMainPostUrl: string) => {
      mainPostUrl.set(fetchedMainPostUrl);
    }
  };
}

export const mainPostUrlStore = manageMainPostUrl();
