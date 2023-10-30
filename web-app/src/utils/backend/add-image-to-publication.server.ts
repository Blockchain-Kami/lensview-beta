import { uploadImage } from "./upload-page-screenshot.server";
import addImageComment from "./add-image-comment.server";
import { signInWithLens } from "./lens-sign-in.server";
import { getParentPost } from "./get-parent-url.server";
import { logger } from "../../log/logManager";

export const addImageToPublication = async (job) => {
  const { urlObj } = job["data"];
  const hashedURL = urlObj["hashedURL"];
  logger.info(
    "utils/backend : add-image-to-publication.server.ts:: " +
      "EXECUTION START: addImageToPublication: " +
      "Adding Image for URL: " +
      urlObj.url
  );
  const [client, signer, profile] = await signInWithLens();
  const res = await getParentPost(hashedURL);
  const parentPostID = res["parent_post_ID"];
  const sourceURL = res["source_url"];

  urlObj["image"] = await uploadImage(sourceURL);

  const response = await addImageComment(
    urlObj,
    parentPostID,
    client,
    signer,
    profile
  );
  if (response) {
    logger.info(
      "utils/backend : add-image-to-publication.server.ts:: " +
        "EXECUTION END: addImageToPublication: " +
        "DONE: Image Added for URL " +
        urlObj.url
    );
    return;
  } else {
    logger.error(
      "utils/backend : add-image-to-publication.server.ts:: " +
        "EXECUTION END: addImageToPublication: " +
        "FAILED: Image Not Added for URL " +
        urlObj.url
    );
    return;
  }
};
