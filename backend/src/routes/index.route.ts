import express, { Request, Response } from "express";

import publicationRoutes from "./publications.route.js";
import commentRoutes from "./comments.route.js";
import urlRoutes from "./url.route.js";
import adminRoutes from "./admin.route.js";

const router = express.Router();

router.use("/publications", publicationRoutes);
router.use("/comment", commentRoutes);
router.use("/url", urlRoutes);
router.use("/admin", adminRoutes);

router.use("/", (_req: Request, res: Response) => {
  res.status(200).send({
    message: `Welcome to the LensView API. Visit https://lensview.io to use the app`
  });
});

export default router;
