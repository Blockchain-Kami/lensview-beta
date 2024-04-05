import express from "express";
import { validateSecretAdminMiddleware } from "../middlewares/admin/validate-secret.admin.middleware";
import {
  addImageToPostAdminController,
  approveSignlessAdminController,
  updatePostImageController
} from "../controllers/admin.controller";

const router = express.Router();

router.post(
  "/add-post-image",
  validateSecretAdminMiddleware,
  addImageToPostAdminController
);

router.post(
  "/approve-signless",
  validateSecretAdminMiddleware,
  approveSignlessAdminController
);

router.post("/update-post-image", updatePostImageController);

export default router;
