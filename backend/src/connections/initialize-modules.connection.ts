import { connectToMongoDB } from "./mongo-db.connection.js";

export const initializeModules = async () => {
  await connectToMongoDB();
};
