import { writable } from 'svelte/store';

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
