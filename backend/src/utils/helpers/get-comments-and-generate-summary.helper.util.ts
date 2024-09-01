import { InternalServerError } from "../../errors/internal-server-error.error.js";
import { CommentsSummaryResponseModel } from "../../models/response/comments-summary.response.model.js";

import { getTextOnlyCommentsOnPublicationLensService } from "../../services/lens/get-text-only-comments-on-publication.lens.service.js";
import { formatTextOnlyInputDataHelperUtil } from "./format-text-only-input-data.helper.util.js";
import { geminiTextSummaryService } from "../../services/gemini-text-summary.service.js";

import { logger } from "../../log/log-manager.log.js";
import { httpStatusCodes } from "../../config/app-constants.config.js";

export const getCommentsAndGenerateSummaryHelperUtil = async (
  publicationId: string
) => {
  try {
    const textOnlyComments =
      await getTextOnlyCommentsOnPublicationLensService(publicationId);
    if (textOnlyComments.items.length === 0) {
      logger.info(
        "comments.controller.ts: getSummaryCommentController: No comments found for the publication with ID: " +
          publicationId
      );
      return null;
    }
    const textOnlyCommentsInputString =
      formatTextOnlyInputDataHelperUtil(textOnlyComments);
    // const summary = await ayfieTextSummaryService(textOnlyCommentsInputString);
    const summary: CommentsSummaryResponseModel =
      await geminiTextSummaryService(textOnlyCommentsInputString);
    logger.info(
      "get-comments-and-generate-summary.helper.util.ts: getCommentsAndGenerateSummaryHelperUtil: Execution Ended. Summary: " +
        JSON.stringify(summary)
    );
    return {
      summary: summary,
      commentCount: textOnlyComments.items.length
    };
  } catch (error) {
    logger.error(
      "get-comments-and-generate-summary.helper.util.ts: getCommentsAndGenerateSummaryHelperUtil: Failed to generate summary. Error: " +
        error
    );
    throw new InternalServerError(
      "Error while generating summary",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
