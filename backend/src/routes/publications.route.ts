import express from "express";
import { getRelatedPublicationsController } from "../controllers/publications.controller";
import { validateRequestQueryParametersMiddleware } from "../middlewares/validate-request-query-parameters.middleware";

const router = express.Router();

router.get(
  "/related",
  validateRequestQueryParametersMiddleware,
  getRelatedPublicationsController
);

export default router;
