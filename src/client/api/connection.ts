import io, { Socket } from "socket.io-client";
import { getFromLocalStorage } from "../utils/localStorage";

const connect = (token: string | null) => {
  return io(process.env.PREACT_DEV_API_URL || "", { auth: { token } });
};

export let socket = connect(getFromLocalStorage<string>("token"));

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  socket.on("connect", () => callback(socket.id));
  socket.on("disconnect", () => callback(""));
  socket.on("reconnect", (socket: Socket) => callback(socket.id));
};

export const unsubscribeFromConnection = () => {
  socket.off("connection");
  socket.off("disconnect");
  socket.off("reconnect");
};

export const reconnect = (token: string | null) => {
  socket.disconnect();
  socket.auth = { token };
  socket.connect();
};
