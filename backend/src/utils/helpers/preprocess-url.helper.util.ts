import { URL } from "url";

import { ClientError } from "../../errors/client-error.error.js";

import { websiteSpecificCleaningHelperUtil } from "./website-specific-cleaning.helper.util.js";

import { httpStatusCodes } from "../../config/app-constants.config.js";
import { logger } from "../../log/log-manager.log.js";

/**
 * Preprocess and clean the URL before storing.
 * The URL will be stored according to the following rules:
 *
 *      a. if URL contains query parameters
 *      and ends with '/' (https://github.com/marketplace/?category=chat&type=apps&query=new+/), the trailing '/'
 *      will not be removed as it is important part of a query parameter.
 *      Hence, stored URL: https://github.com/marketplace/?category=chat&type=apps&query=new+/
 *
 *      b. if URL does not contain query parameters and ends with '/' (https://www.lens.xyz/garden/),
 *      in this case the trailing / will be removed as it is redundant.
 *      Hence, stored URL: https://www.lens.xyz/garden
 *      'https://lens.xyz/dev/?q=true' -> https://lens.xyz/dev?q=true
 *
 *      c. if URL does not contain any path or query parameters (https://www.lens.xyz/)
 *      in this case the trailing / will not be removed as this is the standard way of writing the url
 *
 **/

/**
 * Preprocesses a URL by extracting relevant information and cleaning it.
 * @param url - The URL to preprocess.
 * @returns An array containing the cleaned URL, hostname, domain, path, and query parameters.
 *          Returns null if the URL is invalid.
 */
export const preprocessURLHelperUtil = (
  url: string
): [string, string, string, string, URLSearchParams] => {
  logger.info(
    "preprocess-url.helper.util.ts: preprocessURLHelperUtil: Execution Started."
  );
  logger.info(
    "preprocess-url.helper.util.ts: preprocessURLHelperUtil: Function Input Parameters: " +
      url
  );
  try {
    // convert the url to a URL object
    const parsedURL = new URL(url);
    // logic to handle https and http urls
    if (
      parsedURL["protocol"] === "https:" ||
      parsedURL["protocol"] === "http:"
    ) {
      // remove extra hash at the end of the pathname, if it exists in the url
      if (
        parsedURL["pathname"].toString()[parsedURL["pathname"].length - 1] ===
          "/" &&
        parsedURL["pathname"].toString().length > 1
      ) {
        parsedURL["pathname"] = parsedURL["pathname"]
          .toString()
          .substring(0, parsedURL["pathname"].length - 1);
      }
      // remove extra / from the url
      if (parsedURL["protocol"] === "https:") {
        url =
          parsedURL["protocol"].toString() +
          "//" +
          parsedURL["href"].toString().substring(8).replaceAll(/[/]+/g, "/");
      } else if (parsedURL["protocol"] === "http:") {
        url =
          parsedURL["protocol"].toString() +
          "//" +
          parsedURL["href"].toString().substring(7).replaceAll(/[/]+/g, "/");
      }
    }
    // logic to handle data URIs
    else if (parsedURL["protocol"] === "data:") {
      url = parsedURL["href"];
    }
    logger.info(
      "preprocess-url.helper.util.ts: preprocessURLHelperUtil: URL after Basic Cleaning: " +
        url
    );

    url = websiteSpecificCleaningHelperUtil(url);

    const processedURL = new URL(url);
    // extract the relevant pieces of the url
    const cleanURL = processedURL["href"];
    const origin = processedURL["origin"];
    const hostname = processedURL["hostname"];
    // path is without query parameter
    const path = origin + processedURL["pathname"];
    const query = processedURL["searchParams"];
    const domain = hostname.substring(0, hostname.indexOf("."));
    logger.info(
      "preprocess-url.helper.util.ts: preprocessURLHelperUtil: Execution Ended. Output Array: " +
        [
          cleanURL.toString().trim(),
          hostname.trim().toLowerCase(),
          domain.trim().toLowerCase(),
          path.trim().toLowerCase(),
          query
        ]
    );
    return [
      cleanURL.toString().trim(),
      hostname.trim().toLowerCase(),
      domain.trim().toLowerCase(),
      path.trim().toLowerCase(),
      query
    ];
  } catch (error) {
    logger.error(
      "preprocess-url.helper.util.ts: preprocessURLHelperUtil: Execution Ended.Error in execution: " +
        error
    );
    throw new ClientError(
      "Error processing the URL",
      httpStatusCodes.BAD_REQUEST
    );
  }
};
