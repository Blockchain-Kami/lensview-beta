import express from "express";
import publicationRoutes from "./publications.route";

const router = express.Router();

router.use("/publications", publicationRoutes);

export default router;

