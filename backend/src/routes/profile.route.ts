import express from "express";
import { getProfileDetailsController } from "../controllers/profile.controller";

const router = express.Router();

router.get("/", getProfileDetailsController);

export default router;
