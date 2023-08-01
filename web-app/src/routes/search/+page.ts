import type { PageLoad } from './$types';

export const load = (async () => {
	try {
		const relatedPubs = await fetch('/api/related-pubs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify('youtube.com')
		}).then((res) => res.json());
		console.log('relatedPubs', relatedPubs);
		return {
			foundedMainPostPubId: relatedPubs
		};
	} catch (error) {
		console.log('error', error);
		return {
			foundedMainPostPubId: []
		};
	}
}) satisfies PageLoad;
