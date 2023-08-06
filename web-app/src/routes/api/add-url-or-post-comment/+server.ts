import { error, json } from '@sveltejs/kit';
import { createHash } from '../../../utils/backend/sha1.server';
import { signInWithLens } from '../../../utils/backend/lens-sign-in.server';
import { preprocessURL } from '../../../utils/backend/process-url.server';
import savePost from '../../../utils/backend/add-url.server';
import { imageQueue } from '../../../jobs/imageQueue';
import { isInputTypeUrl } from '../../../utils/backend/check-input-type.server';
import { checkUntilMainPostAdded } from '../../../utils/backend/check-until-post-added.server';
import { getParentPost } from '../../../utils/backend/get-parent-url.server';
import commentAnonymously from "../../../utils/backend/comment-anonymously.server";

export async function POST(requestEvent) {
	const { request } = requestEvent;
	const urlRequest = await request.json();

	const enteredURL = urlRequest['enteredURL'];
	const lensHandle = urlRequest['lensHandle'];
	const postContent = urlRequest['postContent'];
	let pubId;

	const urlString = isInputTypeUrl(enteredURL);

	if (!urlString) {
		throw error(500, {
			isURL: false,
			message: 'User entered a tag'
		});
	}

	const [url, hostname, domain, path, query] = preprocessURL(urlString);
	const hashedURL = createHash(url);
	const hashedHostname = createHash(hostname);
	const hashedPath = createHash(path);

	const urlObj = {
		url,
		hashedURL,
		hostname,
		hashedHostname,
		domain,
		path,
		hashedPath,
		query,
		postContent,
		image : ''
	};

	const authToken = await signInWithLens();

	if (!authToken) {
		throw error(500, {
			message: 'Error: Could not sign in with Lens.'
		});
	}

	const [client, signer, profile] = authToken;

	const publicationExists = await getParentPost(hashedURL);
	pubId = publicationExists['parent_post_ID']

	if (pubId) {
		if (lensHandle) {
			// front end will do the posting, throw error
			return json({
				parentPubId: pubId,
				successCode: 1,
				message: 'Link is already added to LensView.'
			});
		} else if (postContent) {
			const commentAdded = await commentAnonymously(pubId, postContent, client, signer, profile);

			if (commentAdded) {
				return json({
					parentPubId: pubId,
					successCode: 2,
					message: 'Link was already present in LensView. User comment added to the post.'
				});
			}
		}
	}

	const txHash = await savePost(urlObj, client, signer, profile);

	if (!txHash) {
		throw error(500, {
			message: 'Error: Failed to save URL to LensView'
		});
	}
	const indexed = await checkUntilMainPostAdded(txHash, Date.now());

	if (indexed) {
		imageQueue.add({ urlObj });
		const publicationID = await getParentPost(hashedURL);
		pubId = publicationID['parent_post_ID'];

		if (lensHandle) {
			// front end will post the user comment, return response
			return json({
				parentPubId: pubId,
				successCode: 3,
				message: 'New URL added to LensView successfully'
			});
		} else {
			// user adds comment anonymously
			const commentAdded = await commentAnonymously(pubId, postContent, client, signer, profile);

			if (commentAdded) {
				return json({
					parentPubId: pubId,
					successCode: 4,
					message: 'User comment added to the post'
				});
			}
		}
	} else {
		throw error(500, {
			message: 'Error: Transaction not indexed by Lens API. Time exceeded 60 seconds.'
		});
	}
}
