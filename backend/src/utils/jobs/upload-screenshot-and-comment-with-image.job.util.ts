import { MetadataObjectModel } from "../../models/metadata-object.model";
import { relatedParentPublicationsLensService } from "../../services/lens/related-parent-publications.lens.service";
import { fetchScreenshotAndUploadToIPFSJobUtil } from "./fetch-screenshot-and-upload-to-ipfs.job.util";
import { createMetaDataForImageCommentHelperUtil } from "../helpers/create-metadata.helper.util";
// import commentOnchainPublicationUtil from "../publications/comment-onchain.publication.util";
import { logger } from "../../log/log-manager.log";
import { commentMomokaProfileManagerPublicationUtil } from "../publications/comment-momoka-profile-manager.publication.util";

export const uploadScreenshotAndCommentWithImageJobUtil = async (
  urlObj: MetadataObjectModel
) => {
  logger.info(
    "upload-screenshot-and-comment-with-image.job.ts: uploadScreenshotAndCommentWithImageJobUtil: Execution Started."
  );
  try {
    const hashedURL = urlObj.hashedURL;
    const res = await relatedParentPublicationsLensService([hashedURL]);
    const parentPostID = res?.items[0]?.id;
    const sourceURL = urlObj.url;
    urlObj.image = await fetchScreenshotAndUploadToIPFSJobUtil(sourceURL);
    const imageMetadata = createMetaDataForImageCommentHelperUtil(urlObj);
    await commentMomokaProfileManagerPublicationUtil(
      parentPostID,
      imageMetadata
    );
    logger.info(
      "upload-screenshot-and-comment-with-image.job.ts: uploadScreenshotAndCommentWithImageJobUtil: Execution Completed."
    );
    return;
  } catch (error) {
    logger.info(
      "upload-screenshot-and-comment-with-image.job.ts: uploadScreenshotAndCommentWithImageJobUtil: Execution Ended. Error in Execution: " +
        error
    );
    throw new Error(
      "Error while uploading screenshot and commenting with image: " + error
    );
  }
};
