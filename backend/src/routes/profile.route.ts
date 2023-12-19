import express from "express";
import { getProfileInfoForHandleController } from "../controllers/profile.controller";

const router = express.Router();

router.get("/info", getProfileInfoForHandleController);

export default router;
