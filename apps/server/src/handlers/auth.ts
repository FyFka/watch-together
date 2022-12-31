import { sign } from "jsonwebtoken";
import { IExtendedError } from "types/src/ExtendedError";
import config from "../config";
import Account from "../models/account";
import { generateAccount } from "../utils/generate";

export const handleCreateAccount = async () => {
  try {
    const { _id, username, password } = await Account.create(generateAccount());
    const err = new Error("Not authorized") as IExtendedError;
    err.data = {
      evt: "auth::get:account-new",
      payload: {
        token: sign({ id: _id.toHexString() }, config.JWT_SECRET, {
          expiresIn: "168h",
        }),
        account: { username, password, id: _id.toHexString() },
      },
    };

    return err;
  } catch (_) {
    return new Error("Failed to create account");
  }
};
