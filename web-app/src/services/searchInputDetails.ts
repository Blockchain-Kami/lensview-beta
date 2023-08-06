import { writable } from 'svelte/store';
import type { SearchInputDetailsModel } from '../models/searchInputDetails.model';

function manageSearchInputDetails() {
	const searchInput = writable<SearchInputDetailsModel>();

	return {
		subscribe: searchInput.subscribe,
		setSearchInputDetails: (enteredSearchInput: SearchInputDetailsModel) => {
			searchInput.set(enteredSearchInput);
		}
	};
}

export const searchInputDetails = manageSearchInputDetails();
