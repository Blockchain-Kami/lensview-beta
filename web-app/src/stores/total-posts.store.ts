import { writable } from "svelte/store";

function manageTotalPosts() {
  const totalPosts = writable();

  return {
    subscribe: totalPosts.subscribe,
    setTotalPosts: (fetchedTotalPosts: number) => {
      totalPosts.set(fetchedTotalPosts);
    }
  };
}

export const totalPostsStore = manageTotalPosts();
