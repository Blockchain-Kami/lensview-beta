import { writable } from "svelte/store";

function manageId() {
  const id = writable<string | null>(null);

  return {
    subscribe: id.subscribe,
    setId: (fetchedId: string | null) => {
      id.set(fetchedId);
    }
  };
}

export const idUserStore = manageId();
