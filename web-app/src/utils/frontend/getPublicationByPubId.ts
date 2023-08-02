import getPublication from '../../graphql/getPublication';
import baseClient from './baseClient';

export const getPublicationByPubId = async (publicationId: string) => {
	try {
		const client = baseClient;
		return await client
			.query(getPublication, {
				request: {
					publicationIds: [publicationId]
				}
			})
			.toPromise();
	} catch (err) {
		console.log(err);
		throw err;
	}
};
