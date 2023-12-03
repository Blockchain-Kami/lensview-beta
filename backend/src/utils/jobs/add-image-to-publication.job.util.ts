import Queue from "bull";
import { getRelatedPublicationsService } from "../../services/lens/related-parent-publications.lens.service";
import { fetchScreenshotAndUploadToIPFSJobUtil } from "./fetch-screenshot-and-upload-to-ipfs.job.util";
import { InternalServerError } from "../../errors/internal-server-error.error";
import commentOnchainPublicationUtil from "../publications/comment-onchain.publication.util";
import { createMetaDataForImageCommentHelperUtil } from "../helpers/create-metadata.helper.util";

/**
 * Adds an image to a publication.
 *
 * @param {Queue.Job<any>} job - The job containing the data needed to add the image.
 * @return {Promise<void>} - A promise that resolves when the image has been added successfully.
 */
export const addImageToPublicationJobUtil = async (job: Queue.Job<any>) => {
  try {
    const { urlObj } = job.data;
    const hashedURL = urlObj.hashedURL;
    const res = await getRelatedPublicationsService([hashedURL]);
    const parentPostID = res?.items[0]?.id;
    console.log("Adding image to: " + parentPostID);
    const sourceURL = urlObj.url;
    console.log("Source URL to add image: " + sourceURL);
    urlObj.image = await fetchScreenshotAndUploadToIPFSJobUtil(sourceURL);
    const metadata = createMetaDataForImageCommentHelperUtil(urlObj);
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
