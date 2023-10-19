import express from "express";
import { getRelatedPublicationsController } from "../controllers/publications.controller";

const router = express.Router();

router.get("/related", getRelatedPublicationsController);

export default router;
