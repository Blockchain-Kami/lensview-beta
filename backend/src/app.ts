import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import profileRoutes from "./routes/profile.route";
import userActionRoute from "./routes/user-action.route";
import publicationsRoute from "./routes/publications.route";

import { PORT } from "./config/env.config";
import { ALLOWED_ORIGINS } from "./config/app-config.config";

const app = express();

app.use(bodyParser.json());

const allowedOrigins = ALLOWED_ORIGINS.TESTNET;
console.log(allowedOrigins);

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Not Allowed by CORS";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.use("/profile", profileRoutes);

app.use("/user-action", userActionRoute);

app.use("/publications", publicationsRoute);

app.listen(PORT, () => {
  console.log(`LensView server started at http://localhost:${PORT}`);
});
