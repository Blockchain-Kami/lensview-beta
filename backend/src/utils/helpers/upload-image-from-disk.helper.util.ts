import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { MetadataObjectModel } from "../../models/metadata-object.model.js";

import { createMetaDataForImageCommentHelperUtil } from "./create-metadata.helper.util.js";

import { storage } from "../../connections/get-thirdweb-client.connection.js";
import { logger } from "../../log/log-manager.log.js";

export const uploadImageFromDisk = async (
  filename: string,
  urlObj: MetadataObjectModel
) => {
  logger.info(
    "upload-image-from-disk.helper.util.ts: uploadImageFromDisk: Execution Started"
  );
  // @ts-expect-error expected
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);

  const image = fs.readFileSync(__dirname + "/" + filename + ".png");
  const uri = await storage.upload(image);
  const imgCIDURL = storage.resolveScheme(uri);
  urlObj.image = imgCIDURL;
  logger.info(
    "upload-image-from-disk.helper.util.ts: uploadImageFromDisk: Execution Ended. Image Stored at: " +
      imgCIDURL
  );
  return createMetaDataForImageCommentHelperUtil(urlObj);
};
