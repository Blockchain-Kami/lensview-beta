import express from "express";
import { addUrlOrPostCommentController } from "../controllers/comments.controller";
import { putAnonymousCommentController } from "../controllers/comments.controller";
import { validateAnonymousCommentRequestMiddleware } from "../middlewares/comments/validate-request.comments.middleware";

const router = express.Router();

router.post("/anonymous", addUrlOrPostCommentController);
router.put(
  "/anonymous",
  validateAnonymousCommentRequestMiddleware,
  putAnonymousCommentController
);

export default router;
