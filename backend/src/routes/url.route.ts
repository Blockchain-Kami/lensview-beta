import express from "express";
import { postNewPublicationController } from "../controllers/url.controller";
import { URLNewPubRouteMiddleware } from "../middlewares/url/validate-request.url.middleware";

const router = express.Router();

router.post("/new-pub", URLNewPubRouteMiddleware, postNewPublicationController);

export default router;
