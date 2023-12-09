import express from "express";
import { getSimilarProfilePoapController } from "../controllers/profile.controller";
import {
  getProfileDetailsController,
  getProfileCisDashboardController
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);
router.post("/poap", getSimilarProfilePoapController);

export default router;
