import { error, json } from '@sveltejs/kit';
import { PUBLIC_APP_LENS_ID, PUBLIC_LENS_API_URL } from '$env/static/public';
import relatedPubs from '../../../graphql/relatedPubs';
import { createHash } from '../../../utils/backend/sha1.server';
import { preprocessURL } from '../../../utils/backend/process-url.server';
import { isInputTypeUrl } from '../../../utils/backend/check-input-type.server';

export async function POST(requestEvent) {
	const { request } = requestEvent;

	const inputString = await request.json();
	const URL = isInputTypeUrl(inputString);
	let tag;

	if (URL) {
		const [, hostname, ,] = preprocessURL(URL);
		tag = createHash(hostname);
	} else {
		tag = inputString.trim();
	}

	const posts = await fetch(PUBLIC_LENS_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: relatedPubs,
			variables: {
				hashedURL: tag,
				lensId: PUBLIC_APP_LENS_ID
			}
		})
	});

	const postJSON = await posts.json();
	const relatedPosts = postJSON.data.publications;

	if (relatedPosts.items.length < 1) {
		throw error(404, {
			message: 'No related publications found'
		});
	}
	const relatedPubArray = [];

	for (let i = 0; i < relatedPosts.items.length; i++) {
		relatedPubArray.push(relatedPosts.items[i]['id']);
	}

	return json(relatedPubArray);
}
