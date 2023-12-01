import express from "express";
import { getRelatedPublicationsController } from "../controllers/publications.controller";
import { validatePublicationsRelatedRouteRequestMiddleware } from "../middlewares/publications/validate-request.publications.middleware";

const router = express.Router();

router.get(
  "/related",
  validatePublicationsRelatedRouteRequestMiddleware,
  getRelatedPublicationsController
);

export default router;
