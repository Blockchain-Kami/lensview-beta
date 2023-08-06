import baseClient from './baseClient';
import getImageFromComment from '../../graphql/getImageFromComment';
import { PUBLIC_APP_LENS_ID } from '$env/static/public';

const getImageURLFromURLHash = async (urlHash: string) => {
	console.log('');
	try {
		const client = baseClient;
		const request = {
			profileId: PUBLIC_APP_LENS_ID,
			publicationTypes: ['COMMENT'],
			metadata: {
				locale: 'en-us',
				tags: {
					all: [urlHash]
				}
			}
		};
		const response = await client
			.query(getImageFromComment, {
				request
			})
			.toPromise();

		return response?.data?.publications?.items[0]?.metadata?.image;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default getImageURLFromURLHash;
