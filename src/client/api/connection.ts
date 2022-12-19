import io, { Socket } from "socket.io-client";

export const _socket = io(process.env.PREACT_DEV_API_URL || "");

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  _socket.on("connection", (socket: Socket) => {
    callback(socket.id);
  });
};

export const unsubscribeFromConnection = () => {
  _socket.off("connection");
};
