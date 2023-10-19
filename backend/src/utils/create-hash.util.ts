import crypto from "crypto";

export const createHashUtil = (url: string) => {
  return crypto.createHash("sha1").update(url).digest("hex");
};
