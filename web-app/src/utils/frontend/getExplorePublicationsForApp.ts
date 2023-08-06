import baseClient from './baseClient';
import getExplorePublications from '../../graphql/getExplorePublications';

export const getExplorePublicationsForApp = async () => {
	try {
		const client = baseClient;
		const request = {
			sortCriteria: 'LATEST',
			publicationTypes: ['POST'],
			limit: 50,
			sources: ['lensview']
		};
		return await client
			.query(getExplorePublications, {
				request
			})
			.toPromise();
	} catch (err) {
		console.log(err);
		throw err;
	}
};
