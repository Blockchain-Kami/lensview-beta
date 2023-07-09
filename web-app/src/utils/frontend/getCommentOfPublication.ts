import getComments from '../../graphql/getComments';
import baseClient from './baseClient';

export const getCommentOfPublication = async (publicationId: string, limit: number) => {
	try {
		console.log('publicationId' + publicationId);
		const client = baseClient;
		return await client
			.query(getComments, {
				request: {
					commentsOf: publicationId,
					commentsOfOrdering: 'RANKING',
					commentsRankingFilter: 'RELEVANT',
					limit: limit
				}
			})
			.toPromise();
	} catch (err) {
		console.log(err);
		throw err;
	}
};
