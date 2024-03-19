import Queue from "bull";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { uploadScreenshotAndCommentWithImageJobUtil } from "./upload-screenshot-and-comment-with-image.job.util";
import { logger } from "../../log/log-manager.log";

/**
 * Adds an image to a publication.
 *
 * @param {Queue.Job<any>} job - The job containing the data needed to add the image.
 * @return {Promise<void>} - A promise that resolves when the image has been added successfully.
 */
export const addImageToPublicationJobUtil = async (job: Queue.Job) => {
  logger.info(
    "add-image-to-publication.job.ts: addImageToPublicationJobUtil: Execution Started."
  );
  try {
    const { urlObj } = job.data;
    logger.info(
      "add-image-to-publication.job.ts: addImageToPublicationJobUtil: URL Object: " +
        JSON.stringify(urlObj)
    );
    await uploadScreenshotAndCommentWithImageJobUtil(urlObj);
    logger.info(
      "add-image-to-publication.job.ts: addImageToPublicationJobUtil: Execution Completed."
    );
    return;
  } catch (error) {
    logger.info(
      "add-image-to-publication.job.ts: addImageToPublicationJobUtil: Execution Ended. Error in Execution: " +
        error
    );
    throw new InternalServerError(
      "Error while adding image to publication: " + error,
      500,
      "Internal Server Error",
      false
    );
  }
};
