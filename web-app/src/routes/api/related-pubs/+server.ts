import { error, json } from '@sveltejs/kit';
import { PUBLIC_APP_LENS_ID, PUBLIC_LENS_API_URL } from '$env/static/public';
import relatedPubs from '../../../graphql/relatedPubs';
import { createHash } from '../../../utils/backend/sha1.server';
import { preprocessURL } from '../../../utils/backend/process-url.server';
import { isInputTypeUrl } from '../../../utils/backend/check-input-type.server';

const getRelatedParentPublications = async (tag) => {
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
	return postJSON.data.publications;
}


export async function POST(requestEvent) {
	const { request } = requestEvent;

	const inputString = await request.json();

	const URL = isInputTypeUrl(inputString);
	const relatedPubArray = [];
	let tag;

	if (URL) {
		const [, hostname, ,] = preprocessURL(URL);
		tag = createHash(hostname);

		const relatedPosts = await getRelatedParentPublications(tag)

		if (relatedPosts.items.length < 1) {
			throw error(404, {
				message: 'No related publications found'
			});
		}

		for (let i = 0; i < relatedPosts.items.length; i++) {
			relatedPubArray.push(relatedPosts.items[i]['id']);
		}

		return json(relatedPubArray);

	} else {
		const keywords = inputString.trim().split(' ');

		for (let i = 0; i < keywords.length ; i++) {
			const keyword = keywords[i].trim();

			if (keyword != '' ) {
				const { items } = await getRelatedParentPublications(keyword.toLowerCase());
				items.forEach((tag) => {
					relatedPubArray.push(tag.id);
				})
			}

		}
		return json(relatedPubArray);
	}
}
