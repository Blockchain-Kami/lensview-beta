import express from "express";

import {
  validateSecretAdminMiddleware,
  validateUpdatePostImageMiddleware
} from "../middlewares/admin/validate-secret.admin.middleware.js";
import {
  addImageToPostAdminController,
  approveSignlessAdminController,
  updateMainPostImageController
} from "../controllers/admin.controller.js";

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

router.post(
  "/update-post-image",
  validateUpdatePostImageMiddleware,
  updateMainPostImageController
);

export default router;
