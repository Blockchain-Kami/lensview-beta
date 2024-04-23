import { CommentsSummaryResponseModel } from "../../models/response/comments-summary.response.model";
import Publication from "../../models/db/publication.db.model";

export const updateCommentsSummaryDbUtil = async (
  publicationId: string,
  summary: CommentsSummaryResponseModel
) => {
  try {
    const publicationToUpdate = await Publication.findOne({
      id: publicationId
    });
    if (publicationToUpdate) {
      publicationToUpdate.summary = summary.summary;
      publicationToUpdate.sentiment = summary.sentiment.toLowerCase();
      await publicationToUpdate.save();
    }
  } catch (error) {
    console.log(error);
  }
};
