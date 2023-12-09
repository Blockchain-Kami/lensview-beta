import express from "express";
import { getSimilarityProfileController } from "../controllers/profile.controller";
import {
  getProfileDetailsController,
  getProfileCisDashboardController
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);
router.post("/similarity", getSimilarityProfileController);

export default router;
