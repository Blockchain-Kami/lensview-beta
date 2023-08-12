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
		} else if (filterBy === 'imagePub') {
			request = {
				commentsOf: publicationId,
				commentsOfOrdering: 'DESC',
				limit: limit,
				metadata: {
					tags: {
						oneOf: [
							'0f89daeb0a63c7b73224315c5514c21ba0453985',
							'418f361f5cdc602c856956bf752c06a29c52e54a'
						]
					}
				}
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
