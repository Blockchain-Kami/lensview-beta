import express from "express";
import { getRelatedPublicationsController } from "../controllers/publications.controller";
import { validateRelatedRouteRequestMiddleware } from "../middlewares/publications/validate-request.publications.middleware";

const router = express.Router();

router.get(
  "/related",
  validateRelatedRouteRequestMiddleware,
  getRelatedPublicationsController
);

export default router;
