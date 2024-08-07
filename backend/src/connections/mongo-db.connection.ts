import mongoose from "mongoose";

import { MONGODB_CONNECTION_STRING } from "../config/env.config.js";
import { logger } from "../log/log-manager.log.js";

export const connectToMongoDB = async () => {
  try {
    const client = await mongoose.connect(MONGODB_CONNECTION_STRING);
    logger.info(
      "MongoDB connection established successfully. Connected to: " +
        client.connection.name
    );
  } catch (error) {
    logger.error("MongoDB connection failed: " + error);
  }
};
