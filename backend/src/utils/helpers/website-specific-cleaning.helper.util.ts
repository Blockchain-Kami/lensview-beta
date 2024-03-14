import { logger } from "../../log/log-manager.log";

/**
 * Replaces the "m.youtube.com" domain with "YouTube.com" and removes the "&t=\d+s" parameter
 * from the URL if the hostname is "m.youtube.com" or "youtube.com".
 *
 * @param input - The input URL string
 * @returns The modified URL string
 */
export const websiteSpecificCleaningHelperUtil = (input: string): string => {
  logger.info(
    "website-specific-cleaning.helper.util.ts: websiteSpecificCleaningHelperUtil: Execution Started."
  );
  logger.info(
    "website-specific-cleaning.helper.util.ts: websiteSpecificCleaningHelperUtil: Function Input Parameters: " +
      {
        input
      }
  );
  // Parse the input URL
  const inputURL = new URL(input);

  // Convert the hostname to lowercase
  const lowercaseHostname = inputURL.hostname.toLowerCase();

  // Check if the hostname is "m.youtube.com" or "youtube.com"
  if (
    lowercaseHostname === "m.youtube.com" ||
    lowercaseHostname === "youtube.com"
  ) {
    logger.info(
      "website-specific-cleaning.helper.util.ts: websiteSpecificCleaningHelperUtil: Input is a YouTube URL."
    );
    // Replace "m.youtube.com" with "youtube.com"
    let webUrl = input.replace("m.youtube.com", "youtube.com");

    // Remove the "&t=\d+s" parameter from the URL
    webUrl = webUrl.replace(/&t=\d+s/, "");
    logger.info(
      "website-specific-cleaning.helper.util.ts: websiteSpecificCleaningHelperUtil: Execution Ended: Output: " +
        webUrl
    );
    // Return the modified URL
    return webUrl;
  } else {
    logger.info(
      "website-specific-cleaning.helper.util.ts: websiteSpecificCleaningHelperUtil: Execution Ended: Output: " +
        input
    );
    // Return the original input URL
    return input;
  }
};
