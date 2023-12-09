import express from "express";
import { getProfilePoapController } from "../controllers/profile.controller";
import {
  getProfileDetailsController,
  getProfileCisDashboardController
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);
router.get("/poap", getProfilePoapController);

export default router;
