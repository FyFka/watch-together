import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import config from "../config";

export const handleFullAccount = async (socket: Socket) => {
  try {
    const account = verify(socket.handshake.auth.token || "", config.JWT_SECRET);
    return account;
  } catch (err) {
    console.log(err);
  }
};
