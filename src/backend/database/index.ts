import mongoose from "mongoose";
import config from "../config";

function initDatabase() {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(config.DATABASE_URI)
    .then(() => console.log("connected to mongo"))
    .catch((err) => console.log(err));
}

export default initDatabase;
