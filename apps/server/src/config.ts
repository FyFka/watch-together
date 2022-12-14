import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../../.env" });

export default {
  PORT: process.env.PORT || "3000",
  JWT_SECRET: process.env.JWT_SECRET || "JWT_SECRET",
  DATABASE_URI: process.env.DATABASE_URI || "DATABASE_URI",
};
