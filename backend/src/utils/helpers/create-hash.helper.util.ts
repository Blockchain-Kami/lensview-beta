import crypto from "crypto";

/**
 * Creates SHA-1 hash of the given URL.
 *
 * @param {string} url - The URL to hash.
 * @returns {string} The SHA-1 hash of the URL.
 */
export const createHashHelperUtil = (url: string) => {
  return crypto.createHash("sha1").update(url).digest("hex");
};
