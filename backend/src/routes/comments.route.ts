import express from "express";
import { addUrlOrPostCommentController } from "../controllers/comments.controller";

const router = express.Router();

router.post("/anonymous", addUrlOrPostCommentController);

export default router;
