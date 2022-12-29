import { sign } from "jsonwebtoken";
import { IExtendedAccount } from "../../shared/Account";
import config from "../config";
import Account from "../models/account";
import { generateAccount } from "../utils/generate";

export interface IExtendedError extends Error {
  data?: {
    evt: string;
    payload: IExtendedAccount;
  };
}

export const handleCreateAccount = async () => {
  try {
    const err = new Error("Not authorized") as IExtendedError;
    const { _id, username, password } = await Account.create(generateAccount());
    err.data = {
      evt: "auth::get:account-new",
      payload: {
        token: sign({ id: _id.toHexString() }, config.JWT_SECRET, { expiresIn: "168h" }),
        account: { username, password, id: _id.toHexString() },
      },
    };

    return err;
  } catch (_) {
    return new Error("Service unavailable");
  }
};
