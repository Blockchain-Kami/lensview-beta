import { preprocessURLHelperUtil } from "./preprocess-url.helper.util";
import { createHashHelperUtil } from "./create-hash.helper.util";
import { MetadataObjectModel } from "../../models/metadata-object.model";
import { logger } from "../../log/log-manager.log";

/**
 * Generates a metadata object based on the provided URL and other parameters.
 *
 * @param {string} urlString - The URL to preprocess and create metadata from.
 * @param {string} lensHandle - The lens handle to associate with the metadata object.
 * @param {string} postContent - The content of the post to include in the metadata object.
 * @param {string[]} tags - An array of tags to associate with the metadata object.
 * @return {MetadataObjectModel} The generated metadata object.
 */
export const preprocessURLAndCreateMetadataObjectHelperUtil = (
  urlString: string,
  lensHandle: string,
  postContent: string | null,
  tags: string[] | []
): MetadataObjectModel => {
  logger.info(
    "preprocess-url-and-create-metadata-object.helper.util.ts: preprocessURLAndCreateMetadataObjectHelperUtil: Execution Started"
  );
  logger.info(
    "preprocess-url-and-create-metadata-object.helper.util.ts: preprocessURLAndCreateMetadataObjectHelperUtil: Function Input Parameters: " +
      {
        urlString,
        lensHandle,
        postContent,
        tags
      }
  );
  const [url, hostname, domain, path, query] =
    preprocessURLHelperUtil(urlString);
  const hashedURL = createHashHelperUtil(url);
  const hashedHostname = createHashHelperUtil(hostname);
  const hashedPath = createHashHelperUtil(path);
  const urlObj = {
    url,
    hashedURL,
    hostname,
    hashedHostname,
    domain,
    path,
    hashedPath,
    query,
    lensHandle,
    postContent,
    tags,
    image: ""
  };
  logger.info(
    "preprocess-url-and-create-metadata-object.helper.util.ts: preprocessURLAndCreateMetadataObjectHelperUtil: Execution Ended. Output: " +
      urlObj
  );
  return urlObj;
};
