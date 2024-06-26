import express from "express";

import { postNewPublicationController } from "../controllers/url.controller.js";
import { validatePostNewPublicationMiddleware } from "../middlewares/url/validate-request.url.middleware.js";
import { validateRequestQueryParametersMiddleware } from "../middlewares/validate-request-query-parameters.middleware.js";
import { urlExistsValidationController } from "../controllers/url.controller.js";

const router = express.Router();

router.post(
  "/new-pub",
  validatePostNewPublicationMiddleware,
  postNewPublicationController
);
router.get(
  "/validate",
  validateRequestQueryParametersMiddleware,
  urlExistsValidationController
);

export default router;
