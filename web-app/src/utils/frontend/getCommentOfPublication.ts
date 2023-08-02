import getComments from '../../graphql/getComments';
import baseClient from './baseClient';

export const getCommentOfPublication = async (
	publicationId: string,
	limit: number,
	filterBy = 'mostLiked'
) => {
	try {
		let request;
		if (filterBy === 'mostLiked') {
			request = {
				commentsOf: publicationId,
				commentsOfOrdering: 'RANKING',
				commentsRankingFilter: 'RELEVANT',
				limit: limit
			};
		} else if (filterBy === 'latest') {
			request = {
				commentsOf: publicationId,
				commentsOfOrdering: 'DESC',
				limit: limit
			};
		} else if (filterBy === 'post') {
			request = {
				publicationIds: [publicationId]
			};
		}

		const client = baseClient;
		return await client
			.query(getComments, {
				request: request
			})
			.toPromise();
	} catch (err) {
		console.log(err);
		throw err;
	}
};
