import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import profileRoutes from "./routes/profile.route";
import userActionRoute from "./routes/user-action.route";

const app = express();

app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.use("/profile", profileRoutes);

app.use("/user-action", userActionRoute);

app.listen(8080);
