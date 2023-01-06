import { Schema, model } from "mongoose";

export interface IAccountRaw {
  username: string;
  password: string;
  createdAt: number;
}

const AccountSchema = new Schema<IAccountRaw>({
  username: { type: String, required: true },
  createdAt: { type: Number, required: true },
  password: { type: String, required: true },
});

const Account = model<IAccountRaw>("Account", AccountSchema);
export default Account;
