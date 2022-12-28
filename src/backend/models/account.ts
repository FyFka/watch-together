import { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

const Account = model("Account", AccountSchema);
export default Account;
