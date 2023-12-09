import express, { Request, Response } from "express";
import publicationRoutes from "./publications.route";
import commentRoutes from "./comments.route";
import urlRoutes from "./url.route";
import adminRoutes from "./admin.route";
import profileRoutes from "./profile.route";

const router = express.Router();

router.use("/publications", publicationRoutes);
router.use("/comment", commentRoutes);
router.use("/url", urlRoutes);
router.use("/admin", adminRoutes);
router.use("/profile", profileRoutes);

router.use("/", (_req: Request, res: Response) => {
  res.status(200).send({
    message: `Welcome to the Lens API. Visit https://testnet.lensview.io to use the app`
  });
});

export default router;
