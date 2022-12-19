import io, { Socket } from "socket.io-client";

export const _socket = io(process.env.PREACT_DEV_API_URL || "");

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  _socket.on("connect", () => callback(_socket.id));
  _socket.on("disconnect", () => callback(""));
  _socket.on("reconnect", (socket: Socket) => callback(socket.id));
};

export const unsubscribeFromConnection = () => {
  _socket.off("connection");
  _socket.off("disconnect");
  _socket.off("reconnect");
};
