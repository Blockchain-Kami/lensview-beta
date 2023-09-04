import { writable } from 'svelte/store';

function manageMetaTagsTitle() {
	const metaTagsTitle = writable();

	return {
		subscribe: metaTagsTitle.subscribe,
		setMetaTagsTitle: (fetchedMetaTagsTitle: string) => {
			metaTagsTitle.set(fetchedMetaTagsTitle);
		}
	};
}

export const metaTagsTitle = manageMetaTagsTitle();

function manageMetaTagsDescription() {
	const metaTagsDescription = writable();

	return {
		subscribe: metaTagsDescription.subscribe,
		setMetaTagsDescription: (fetchedMetaTagsDescription: string) => {
			metaTagsDescription.set(fetchedMetaTagsDescription);
		}
	};
}

export const metaTagsDescription = manageMetaTagsDescription();

function manageMetaTagsImageUrl() {
	const metaTagsImageUrl = writable();

	return {
		subscribe: metaTagsImageUrl.subscribe,
		setMetaTagsImageUrl: (fetchedMetaTagsImageUrl: string) => {
			metaTagsImageUrl.set(fetchedMetaTagsImageUrl);
		}
	};
}

export const metaTagsImageUrl = manageMetaTagsImageUrl();

function manageMetaTagsImageAlt() {
	const metaTagsImageAlt = writable();

	return {
		subscribe: metaTagsImageAlt.subscribe,
		setMetaTagsImageAlt: (fetchedMetaTagsImageAlt: string) => {
			metaTagsImageAlt.set(fetchedMetaTagsImageAlt);
		}
	};
}

export const metaTagsImageAlt = manageMetaTagsImageAlt();
