import { CommentsSummaryResponseModel } from "../../models/response/comments-summary.response.model";
import { getTextOnlyCommentsOnPublicationLensService } from "../../services/lens/get-text-only-comments-on-publication.lens.service";
import { formatTextOnlyInputDataHelperUtil } from "./format-text-only-input-data.helper.util";
import { geminiTextSummartService } from "../../services/gemini-text-summart.service";
import { logger } from "../../log/log-manager.log";

export const getCommentsAndGenerateSummaryHelperUtil = async (
  publicationId: string
) => {
  const textOnlyComments =
    await getTextOnlyCommentsOnPublicationLensService(publicationId);
  if (textOnlyComments.items.length === 0) {
    logger.info(
      "comments.controller.ts: getSummaryCommentController: No comments found. Sending 204."
    );
    return null;
  }
  const textOnlyCommentsInputString =
    formatTextOnlyInputDataHelperUtil(textOnlyComments);
  // const summary = await ayfieTextSummaryService(textOnlyCommentsInputString);
  const summary: CommentsSummaryResponseModel = await geminiTextSummartService(
    textOnlyCommentsInputString
  );
  return summary;
};
