import express from "express";
import {
  getProfileDetailsController,
  getProfileCisDashboardController,
  checkHandleIsXMTPEnabledController,
  getSimilarityProfileController
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);
router.post("/similarity", getSimilarityProfileController);
router.post("/is-xmtp-enabled", checkHandleIsXMTPEnabledController);

export default router;
