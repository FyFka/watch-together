import { Socket } from "socket.io";
import { handleCreateAccount, IExtendedError } from "../handlers/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import database from "../database";
import { ObjectId } from "mongodb";

export const authMiddleware = async (socket: Socket, next: (err?: IExtendedError | undefined) => void) => {
  try {
    const { id } = verify(socket.handshake.auth.token || "", config.JWT_SECRET) as { id: string };
    if (id) {
      const account = await database.collection("accounts").findOne({ _id: new ObjectId(id) });
      if (account) {
        socket.account = { username: account.username, password: account.password, id: account._id.toHexString() };
        return next();
      }
    }
    next(await handleCreateAccount());
  } catch (err) {
    next(await handleCreateAccount());
  }
};
