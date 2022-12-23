import { sign } from "jsonwebtoken";
import { IExtendedAccount } from "../../shared/Account";
import config from "../config";
import database from "../database";
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
    const account = generateAccount();
    const { insertedId } = await database.collection("accounts").insertOne(account);
    err.data = {
      evt: "auth::get:account-new",
      payload: {
        token: sign({ id: insertedId }, config.JWT_SECRET, { expiresIn: "72h" }),
        account: { ...account, id: insertedId.toHexString() },
      },
    };

    return err;
  } catch (_) {}
};
