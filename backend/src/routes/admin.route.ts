import express from "express";
import { validateSecretAdminMiddleware } from "../middlewares/admin/validate-secret.admin.middleware";
import { addImageToPostAdminController } from "../controllers/admin.controller";

const router = express.Router();

router.post(
  "/add-post-image",
  validateSecretAdminMiddleware,
  addImageToPostAdminController
);

export default router;
