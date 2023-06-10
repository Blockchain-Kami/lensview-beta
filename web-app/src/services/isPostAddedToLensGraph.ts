import { writable } from "svelte/store";

function manageMainPostAdded() {
  const isAdded = writable(false);

  return {
    subscribe: isAdded.subscribe,
    set: (updatedIsAddedStatus: boolean) => {
      isAdded.set(updatedIsAddedStatus);
    }
  };
}

//TODO: Clean this after testing checkUntilMainPostAdded is working
export const isMainPostAdded = manageMainPostAdded();


function manageTotalPosts() {
  const totalPostCount = writable(0);

  return {
    subscribe: totalPostCount.subscribe,
    set: (updatedTotalPostCount: number) => {
      totalPostCount.set(updatedTotalPostCount);
    }
  };
}

export const currentTotalPosts = manageTotalPosts();
