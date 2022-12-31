/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "../config";

function initDatabase() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(config.DATABASE_URI)
    .then(() => console.log("[DATABASE]: Connected to mongo"))
    .catch((err) => console.log(`[DATABASE]: ${err.message}`));
}

export default initDatabase;
