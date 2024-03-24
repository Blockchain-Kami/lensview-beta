import { preprocessURLHelperUtil } from "../helpers/preprocess-url.helper.util";
import { relatedParentPublicationsLensService } from "../../services/lens/related-parent-publications.lens.service";
import { InternalServerError } from "../../errors/internal-server-error.error";
import { logger } from "../../log/log-manager.log";
import { FAILURE, SUCCESS } from "../../config/app-constants.config";

/**
 * Retrieves the publications related to a given URL.
 *
 * @param {string} URL - The URL for which to retrieve related publications.
 * @return {Promise<{relatedPublications: string[], message: string}>} - The related publications and a success message.
 */
export const getPublicationsForURLPublicationUtil = async (URL: string) => {
  logger.info(
    "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: Execution Started."
  );
  logger.info(
    "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: Function Input Parameters: URL: " +
      URL
  );
  try {
    const relatedPublications: Array<string> = [];
    const urlObject = preprocessURLHelperUtil(URL);
    const hostname = urlObject?.[1];
    if (hostname) {
      const tag = hostname.toString().toLowerCase();

      const relatedPosts = await relatedParentPublicationsLensService([tag]);

      const items = relatedPosts?.items || [];

      items.forEach((publication) => {
        if (publication.__typename === "Post")
          relatedPublications.push(publication?.id);
      });
      logger.info(
        "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: Related Publications: " +
          relatedPublications
      );
      logger.info(
        "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: Execution Completed."
      );
      return {
        relatedPublications,
        message: SUCCESS
      };
    } else {
      logger.error(
        "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: : " +
          URL
      );
      return {
        relatedPublications: [],
        message: FAILURE
      };
    }
  } catch (error) {
    logger.error(
      "get-publications-for-url-publication.util.ts: getPublicationsForURLPublicationUtil: " +
        error
    );
    throw new InternalServerError("Something went wrong: " + error, 500);
  }
};
