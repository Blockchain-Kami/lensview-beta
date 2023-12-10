import express from "express";
import {
  getProfileDetailsController,
  getProfileCisDashboardController,
  checkHandleIsXMTPEnabledController,
  getSimilarityProfileController
} from "../controllers/profile.controller";
import { sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);
router.post("/similarity", getSimilarityProfileController);
router.post("/is-xmtp-enabled", checkHandleIsXMTPEnabledController);
router.post("/message", sendMessage);

export default router;
