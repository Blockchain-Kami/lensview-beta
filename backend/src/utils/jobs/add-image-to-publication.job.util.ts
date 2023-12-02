import Queue from "bull";
import { getRelatedPublicationsService } from "../../services/lens/related-parent-publications.lens.service";
import { fetchScreenshotUploadIPFSUtil } from "./fetch-screenshot-upload-ipfs.job.util";
import { InternalServerError } from "../../errors/internal-server-error.error";
import commentOnchainPublicationUtil from "../publications/comment-onchain.publication.util";
import { createMetaDataForImageComment } from "../helpers/create-metadata.helpers.util";

/**
 * Adds an image to a publication.
 *
 * @param {Queue.Job<any>} job - The job containing the data needed to add the image.
 * @return {Promise<void>} - A promise that resolves when the image has been added successfully.
 */
export const addImageToPublicationUtil = async (job: Queue.Job<any>) => {
  try {
    const { urlObj } = job.data;
    const hashedURL = urlObj.hashedURL;
    const res = await getRelatedPublicationsService([hashedURL]);
    const parentPostID = res?.items[0]?.id;
    console.log("Adding image to: " + parentPostID);
    const sourceURL = urlObj.url;
    console.log("Source URL to add image: " + sourceURL);
    urlObj.image = await fetchScreenshotUploadIPFSUtil(sourceURL);
    const metadata = createMetaDataForImageComment(urlObj);
    await commentOnchainPublicationUtil(parentPostID, metadata);
    return;
  } catch (error) {
    console.log(error);
    throw new InternalServerError(
      "Error while adding image to publication: " + error,
      500,
      "Internal Server Error",
      false
    );
  }
};
