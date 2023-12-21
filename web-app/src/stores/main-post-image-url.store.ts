import { writable } from "svelte/store";

function manageMainPostImageUrl() {
  const mainPostImageUrl = writable<string>();

  return {
    subscribe: mainPostImageUrl.subscribe,
    setMainPostImageUrl: (fetchedMainPostImageUrl: string) => {
      mainPostImageUrl.set(fetchedMainPostImageUrl);
    }
  };
}

export const mainPostImageUrlStore = manageMainPostImageUrl();
