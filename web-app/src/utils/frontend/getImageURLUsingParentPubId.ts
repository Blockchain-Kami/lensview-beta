import baseClient from './baseClient';
import getImageFromComment from '../../graphql/getImageFromComment';

const getImageURLUsingParentPubId = async (parentPubId: string) => {
	console.log('');
	try {
		const client = baseClient;
		const request = {
			commentsOf: parentPubId,
			commentsOfOrdering: 'DESC',
			limit: 1,
			metadata: {
				locale: 'en-us',
				tags: {
					oneOf: ['dd472d3370b389eb8399ea7c795ca9e76ff0d4d7']
				}
			}
		};
		const response = await client
			.query(getImageFromComment, {
				request
			})
			.toPromise();

		return response?.data?.publications?.items[0]?.metadata?.media[0]?.original?.url;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export default getImageURLUsingParentPubId;
