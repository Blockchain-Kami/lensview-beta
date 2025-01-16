import express, { Request, Response } from "express";

import { getAuthenticatedClientAuthenticationUtil } from "../utils/authentication/get-authenticated-client.authentication.util.js";
import { imageComment, newPost } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/authenticate", async (req: Request, res: Response) => {
  try {
    await getAuthenticatedClientAuthenticationUtil();
    res.status(200).send("Authenticated");
  } catch (e) {
    res.status(500).send({
      message: "Failed to authenticate " + e
    });
  }
});

router.post("/comment", async (req: Request, res: Response) => {
  try {
    await newPost(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Failed to authenticate " + e
    });
  }
});

router.post("/imageComment", async (req: Request, res: Response) => {
  try {
    await imageComment(req, res);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Failed to authenticate " + e
    });
  }
});

export default router;
