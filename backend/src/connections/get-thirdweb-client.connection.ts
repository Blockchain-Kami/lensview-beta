import { ThirdwebStorage } from "@thirdweb-dev/storage";

import { THIRD_WEB_SECRET_KEY } from "../config/env.config.js";

export const storage = new ThirdwebStorage({
  secretKey: THIRD_WEB_SECRET_KEY
});
