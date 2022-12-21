import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { handleInvalidToken } from "../handlers/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import database from "../database";
import { ObjectId } from "mongodb";

export const authMiddleware = async (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
  try {
    const { id } = verify(socket.handshake.auth.token || "", config.JWT_SECRET) as { id: string };
    if (id) {
      const account = await database.collection("accounts").findOne({ _id: new ObjectId(id) });
      if (account) {
        socket.account = { username: account.username, id: account._id.toHexString() };
        return next();
      }
    }
    next(await handleInvalidToken());
  } catch (err) {
    next(await handleInvalidToken());
  }
};
