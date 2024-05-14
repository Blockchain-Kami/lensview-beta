import { NFTStorage, File, Blob } from "nft.storage";
import { NFT_STORAGE_TOKEN } from "../../config/env.config";
import { logger } from "../../log/log-manager.log";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { httpStatusCodes } from "../../config/app-constants.config";
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
  const client = makeStorageClient();
  const cid = await client.storeDirectory(makeFileObjects(data));
  const uri = `https://${cid}.ipfs.nftstorage.link/metaData.json`;
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Stored publication metadata. URI: " +
      uri
  );
  logger.info(
    "upload-to-ipfs.helper.util.ts: uploadToIPFSHelperUtil: Execution Ended."
  );
  return uri;
};

if (!NFT_STORAGE_TOKEN) {
  throw new Error("Must define NFT_STORAGE_TOKEN in the .env to run this");
}

/**
 * Creates a new instance of the StorageClient class.
 *
 * @return {NFTStorage} A new instance of the StorageClient class.
 */
function makeStorageClient(): NFTStorage {
  // return new Web3Storage({ token: WEB3STORAGE_TOKEN });
  try {
    return new NFTStorage({ token: NFT_STORAGE_TOKEN });
  } catch (error) {
    logger.error(
      "upload-to-ipfs.helper.util.ts: makeStorageClient: Error while creating storage client: " +
        error
    );
    throw new InternalServerError(
      "Error while creating storage client",
      httpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

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
