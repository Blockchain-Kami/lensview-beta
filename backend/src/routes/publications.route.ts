import express from "express";
import { getRelatedPublicationsController } from "../controllers/publications.controller";
import { validateRequestQueryParameterMiddleware } from "../middlewares/publications/validate-request.publications.middleware";

const router = express.Router();

router.get(
  "/related",
  validateRequestQueryParameterMiddleware,
  getRelatedPublicationsController
);

export default router;
