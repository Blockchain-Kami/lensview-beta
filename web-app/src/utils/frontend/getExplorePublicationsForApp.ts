import baseClient from './baseClient';
import getExplorePublications from '../../graphql/getExplorePublications';
import { PUBLIC_SOURCE_APP_ID } from '$env/static/public';

export const getExplorePublicationsForApp = async () => {
	try {
		const client = baseClient;
		const request = {
			sortCriteria: 'LATEST',
			publicationTypes: ['POST'],
			limit: 50,
			sources: [PUBLIC_SOURCE_APP_ID]
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
