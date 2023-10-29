import { PUBLIC_APP_LENS_ID, PUBLIC_LENS_API_URL } from '$env/static/public';
import getPosts from '../../graphql/getPosts';
import { logger } from '../../log/logManager';

export const getParentPost = async (hashedURL) => {
	logger.info('utils/backend: get-parent-url.server.ts :: ' + 'EXECUTION START: getParentPost');
	try {
		const posts = await fetch(PUBLIC_LENS_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: getPosts,
				variables: {
					hashedURL: hashedURL,
					lensId: PUBLIC_APP_LENS_ID
				}
			})
		});
		const response = await posts.json();

		if (response.data.publications.items.length < 1) {
			logger.info(
				'utils/backend: get-parent-url.server.ts :: ' +
					'EXECUTION END: getParentPost: ' +
					'No related publications found'
			);
			return {
				status: 404,
				parent_post_ID: null,
				message: 'No related publications found'
			};
		}

		try {
			const parentPostID = response.data.publications.items[0].id;
			const sourceURL = response.data.publications.items[0].metadata.content;
			logger.info(
				'utils/backend: get-parent-url.server.ts :: ' +
					'EXECUTION END: getParentPost: ' +
					'Publication found: ' +
					parentPostID
			);
			return {
				status: 200,
				parent_post_ID: parentPostID,
				source_url: sourceURL,
				message: 'Successfully fetched parent publication ID'
			};
		} catch (error) {
			logger.error(
				'utils/backend: get-parent-url.server.ts :: ' +
					'EXECUTION END: getParentPost: ' +
					'Failed to extract pubID from response: ' +
					error
			);
			return {
				status: 500,
				parent_post_ID: null,
				source_url: null,
				message: 'Error: Could not extract publication ID from response'
			};
		}
	} catch (error) {
		logger.error(
			'utils/backend: get-parent-url.server.ts :: ' +
				'EXECUTION END: getParentPost: ' +
				'Error connecting to Lens Protocol: ' +
				error
		);
		return {
			status: 500,
			parent_post_ID: null,
			source_url: null,
			message: 'Error: Could not connect to Lens Protocol.'
		};
	}
};
