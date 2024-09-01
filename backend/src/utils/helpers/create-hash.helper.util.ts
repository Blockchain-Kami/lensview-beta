import crypto from "crypto";

import { logger } from "../../log/log-manager.log.js";

/**
 * Creates SHA-1 hash of the given URL.
 *
 * @param {string} input - The input string to hash.
 * @returns {string} The SHA-1 hash of the URL.
 */
export const createHashHelperUtil = (input: string): string => {
  logger.info(
    "create-hash.helper.util.ts: createHashHelperUtil: Execution Started. Input: " +
      input
  );
  const hashOfInput = crypto.createHash("sha1").update(input).digest("hex");
  logger.info(
    "create-hash.helper.util.ts: createHashHelperUtil: Execution Completed. Output: " +
      hashOfInput
  );
  return hashOfInput;
};
