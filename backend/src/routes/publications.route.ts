import express from "express";

import { getRelatedPublicationsController } from "../controllers/publications.controller.js";
import { validateRequestQueryParametersMiddleware } from "../middlewares/validate-request-query-parameters.middleware.js";

const router = express.Router();

router.get(
  "/related",
  validateRequestQueryParametersMiddleware,
  getRelatedPublicationsController
);

export default router;
