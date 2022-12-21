import { sign } from "jsonwebtoken";
import { uniqueNamesGenerator, animals, adjectives } from "unique-names-generator";
import config from "../config";
import database from "../database";

export const handleInvalidToken = async () => {
  try {
    const err = new Error("Not authorized") as any;
    const account = {
      username: uniqueNamesGenerator({ dictionaries: [adjectives, animals] }),
      createdAt: new Date(),
    };
    const { insertedId } = await database.collection("accounts").insertOne(account);
    err.data = {
      evt: "auth::get:account-new",
      payload: {
        token: sign({ id: insertedId }, config.JWT_SECRET, { expiresIn: "72h" }),
        account,
      },
    };

    return err;
  } catch (err: any) {
    return { message: "Something bad happened. The room has not been created" };
  }
};
