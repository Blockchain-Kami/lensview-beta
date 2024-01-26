import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { createNamespace } from "continuation-local-storage";

import bodyParser from "body-parser";
import routes from "./routes/index.route";
import { logger } from "./log/log-manager.log";

import { IS_PROD, PORT } from "./config/env.config";
import { ALLOWED_ORIGINS } from "./config/app-config.config";

const app = express();

app.use(bodyParser.json());

console.log("Welcome!!");

const allowedOrigins = IS_PROD
  ? ALLOWED_ORIGINS.PRODUCTION
  : ALLOWED_ORIGINS.DEVELOPMENT;
console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
      if (!origin) {
        console.log("no origin");
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Not Allowed by CORS";
        console.log(msg);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

const myRequest = createNamespace("my request");
// Run the context for each request. Assign a unique identifier to each request
app.use(function (req, res, next) {
  myRequest.run(function () {
    myRequest.set("reqId", uuidv4());
    next();
  });
});

app.use("/", routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

logger.info("The folder: was created");

app.listen(PORT, () => {
  console.log(`LensView server started at http://localhost:${PORT}`);
});
