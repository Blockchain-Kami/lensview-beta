import express from "express";
import { postNewPublicationController } from "../controllers/url.controller";
import { validatePostNewPublicationMiddleware } from "../middlewares/url/validate-request.url.middleware";
import { validateRequestQueryParametersMiddleware } from "../middlewares/validate-request-query-parameters.middleware";
import { urlExistsValidationController } from "../controllers/url.controller";

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
