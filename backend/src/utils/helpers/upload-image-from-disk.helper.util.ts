import fs from "fs";
import { create } from "@web3-storage/w3up-client";
import path from "path";
import { fileURLToPath } from "url";

import { MetadataObjectModel } from "../../models/metadata-object.model.js";

import { createMetaDataForImageCommentHelperUtil } from "./create-metadata.helper.util.js";

import { WEB3_STORAGE_DID_KEY } from "../../config/env.config.js";
import { logger } from "../../log/log-manager.log.js";

export const uploadImageFromDisk = async (
  filename: string,
  urlObj: MetadataObjectModel
) => {
  logger.info(
    "upload-image-from-disk.helper.util.ts: uploadImageFromDisk: Execution Started"
  );
  const client = await create();
  await client.setCurrentSpace(`did:key:${WEB3_STORAGE_DID_KEY}`);
  // @ts-expect-error expected
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const image = fs.readFileSync(__dirname + "/" + filename + ".png");
  const screenshotBlob = new Blob([image]);
  const imgCID = await client.uploadFile(screenshotBlob);
  const imgCIDURL = `https://${imgCID}.ipfs.w3s.link/`;
  urlObj.image = imgCIDURL;
  logger.info(
    "upload-image-from-disk.helper.util.ts: uploadImageFromDisk: Execution Ended. Image Stored at: " +
      imgCIDURL
  );
  return createMetaDataForImageCommentHelperUtil(urlObj);
};
