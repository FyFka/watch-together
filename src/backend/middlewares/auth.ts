import { Socket } from "socket.io";
import { handleCreateAccount, IExtendedError } from "../handlers/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import Account from "../models/account";

export const authMiddleware = async (socket: Socket, next: (err?: IExtendedError | undefined) => void) => {
  try {
    const { id } = verify(socket.handshake.auth.token || "", config.JWT_SECRET) as { id: string };
    if (id) {
      const account = await Account.findById(id);
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
