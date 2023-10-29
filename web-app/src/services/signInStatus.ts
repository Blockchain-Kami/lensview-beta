import { writable } from 'svelte/store';

function manageSignInStatus() {
	const isSignedIn = writable(false);

	return {
		subscribe: isSignedIn.subscribe,
		setSignInStatus: (currentStatus: boolean) => {
			isSignedIn.set(currentStatus);
		}
	};
}

export const isSignedIn = manageSignInStatus();
