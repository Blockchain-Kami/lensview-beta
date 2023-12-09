import express from "express";
import {
  getProfileDetailsController,
  getProfileCisDashboardController
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);
router.get("/cis-dashboard", getProfileCisDashboardController);

export default router;
