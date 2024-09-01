import { storage } from "../../connections/get-thirdweb-client.connection.js";

import { logger } from "../../log/log-manager.log.js";
import { InternalServerError } from "../../errors/internal-server-error.error.js";
import { httpStatusCodes } from "../../config/app-constants.config.js";

/**
 * Uploads a file to IPFS and returns the URI of the uploaded file.
 *
 * @param {string} data - The data to be uploaded to IPFS.
 * @return {string} The URI of the uploaded file.
 */
export const uploadToIPFSHelperUtil = async (data: string): Promise<string> => {
  try {
    logger.info(
      "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Started."
    );
    logger.info(
      "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Input parameters: " +
        JSON.stringify(data)
    );
    const uri = await storage.upload(JSON.parse(data));
    const url = storage.resolveScheme(uri);
    console.log(url);
    logger.info(
      "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Stored publication metadata. URL: " +
        url
    );
    logger.info(
      "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Ended."
    );
    return url;
  } catch (error) {
    logger.error(
      "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Ended. Error in Execution: " +
        error
    );
    throw new InternalServerError(
      "Error in uploading to IPFS",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
