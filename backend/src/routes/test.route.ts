import express, { Request, Response } from "express";

import { getAuthenticatedClientAuthenticationUtil } from "../utils/authentication/get-authenticated-client.authentication.util.js";

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

export default router;
