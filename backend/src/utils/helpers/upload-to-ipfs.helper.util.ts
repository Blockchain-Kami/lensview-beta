import { create } from "@web3-storage/w3up-client";
import { File, Blob } from "nft.storage";

import { InternalServerError } from "../../errors/internal-server-error.error.js";

import { httpStatusCodes } from "../../config/app-constants.config.js";
import { WEB3_STORAGE_DID_KEY } from "../../config/env.config.js";
import { logger } from "../../log/log-manager.log.js";
// import { Web3Storage, File } from "web3.storage";

/**
 * Uploads a file to IPFS and returns the URI of the uploaded file.
 *
 * @param {string} data - The data to be uploaded to IPFS.
 * @return {string} The URI of the uploaded file.
 */
export const uploadToIPFSHelperUtil = async (data: string): Promise<string> => {
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Started."
  );
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Input parameters: " +
      JSON.stringify(data)
  );
  const client = await create();
  await client.setCurrentSpace(`did:key:${WEB3_STORAGE_DID_KEY}`);
  const files = makeFileObjects(data);
  const cid = await client.uploadDirectory(files);
  const uri = `https://${cid}.ipfs.w3s.link/metaData.json`;
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Stored publication metadata. URI: " +
      uri
  );
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Ended."
  );
  return uri;
};

/**
 * Creates File objects from binary data.
 *
 * @param {string} data - The binary data used to create the File objects.
 * @return {File[]} An array of File objects created from the binary data.
 */
function makeFileObjects(data: string): File[] {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  try {
    logger.info(
      "upload-to-ipfs.helper.util.ts: makeFileObjects: Making file objects for data: " +
        data
    );
    const blob = new Blob([data], {
      type: "application/json"
    });

    return [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metaData.json")
    ];
  } catch (error) {
    logger.error(
      "upload-to-ipfs.helper.util.ts: makeFileObjects: Error while creating file objects: " +
        error
    );
    throw new InternalServerError(
      "Error while creating file objects",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
