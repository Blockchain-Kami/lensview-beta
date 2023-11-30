import { writable } from "svelte/store";

function manageReloadMainPost() {
  const reloadMainPost = writable(0);

  return {
    subscribe: reloadMainPost.subscribe,
    setReloadMainPost: (updatedVal: number) => {
      reloadMainPost.set(updatedVal);
    }
  };
}

export const reloadMainPost = manageReloadMainPost();

function manageReloadCommentOfAPublication() {
  const reloadCommentOfAPublication = writable(0);

  return {
    subscribe: reloadCommentOfAPublication.subscribe,
    setReloadCommentOfAPublication: (updatedVal: number) => {
      reloadCommentOfAPublication.set(updatedVal);
    }
  };
}

export const reloadCommentOfAPublication = manageReloadCommentOfAPublication();

function manageReloadAPublication() {
  const reloadAPublication = writable(0);

  return {
    subscribe: reloadAPublication.subscribe,
    setReloadAPublication: (updatedVal: number) => {
      reloadAPublication.set(updatedVal);
    }
  };
}

export const reloadAPublication = manageReloadAPublication();
