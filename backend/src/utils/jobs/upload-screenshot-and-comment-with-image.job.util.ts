import { MetadataObjectModel } from "../../models/metadata-object.model.js";

import { relatedParentPublicationsLensService } from "../../services/lens/related-parent-publications.lens.service.js";
import { fetchScreenshotAndUploadToIPFSJobUtil } from "./fetch-screenshot-and-upload-to-ipfs.job.util.js";
import { createMetaDataForImageCommentHelperUtil } from "../helpers/create-metadata.helper.util.js";
import { createCommentPublicationUtil } from "../publications/create-post.publication.util.js";

import { logger } from "../../log/log-manager.log.js";

export const uploadScreenshotAndCommentWithImageJobUtil = async (
  urlObj: MetadataObjectModel
) => {
  logger.info(
    "upload-screenshot-and-comment-with-image.job.ts: uploadScreenshotAndCommentWithImageJobUtil: Execution Started."
  );
  try {
    const hashedURL = urlObj.hashedURL;
    const res = await relatedParentPublicationsLensService([hashedURL]);
    const parentPostID = res?.items[0]?.slug;
    const sourceURL = urlObj.url;
    urlObj.image = await fetchScreenshotAndUploadToIPFSJobUtil(sourceURL);
    const imageMetadata = createMetaDataForImageCommentHelperUtil(
      parentPostID,
      urlObj
    );
    await createCommentPublicationUtil(parentPostID, imageMetadata);
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
