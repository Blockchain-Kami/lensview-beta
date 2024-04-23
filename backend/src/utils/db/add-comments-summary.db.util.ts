import { CommentsSummaryResponseModel } from "../../models/response/comments-summary.response.model";
import Publication from "../../models/db/publication.db.model";

export const addCommentsSummaryDbUtil = async (
  publicationId: string,
  summary: CommentsSummaryResponseModel
) => {
  try {
    const newPublication = new Publication({
      id: publicationId,
      summary: summary.summary,
      sentiment: summary.sentiment.toLowerCase()
    });

    await newPublication.save();
  } catch (error) {
    console.log(error);
  }
};
