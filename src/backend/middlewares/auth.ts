import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { handleInvalidToken } from "../handlers/auth";
import { verify } from "jsonwebtoken";
import config from "../config";

export const authMiddleware = (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
  try {
    const token = verify(socket.handshake.auth.token || "", config.JWT_SECRET);
    if (token) {
      next();
    } else {
      next(handleInvalidToken());
    }
  } catch (err) {
    next(handleInvalidToken());
  }
};
