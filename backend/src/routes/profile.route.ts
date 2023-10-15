import express from "express";

import { getHandle } from "../controllers/profile.controller";

const router = express.Router();

// GET /profile/handle
router.get("/handle", getHandle);

export default router;
