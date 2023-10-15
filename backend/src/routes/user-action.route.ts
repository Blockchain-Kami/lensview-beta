import express from "express";

import {
  addReaction,
  removeReaction
} from "../controllers/user-action.controller";

const router = express.Router();

// POST /user-action/reaction
router.post("/reaction", addReaction);

// DELETE /user-action/reaction
router.delete("/reaction", removeReaction);

export default router;
