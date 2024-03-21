import { writable } from "svelte/store";

function manageTotalComments() {
  const totalComments = writable();

  return {
    subscribe: totalComments.subscribe,
    setTotalComments: (fetchedTotalComments: number) => {
      totalComments.set(fetchedTotalComments);
    }
  };
}

export const totalComments = manageTotalComments();
