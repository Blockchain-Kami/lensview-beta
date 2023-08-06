import baseClient from './baseClient';
import getImageFromComment from '../../graphql/getImageFromComment';

const getImageURLFromURLHash = async (urlHash: string) => {
	try {
		const client = baseClient;
		const request = {
			profileId: '0x7e11',
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
