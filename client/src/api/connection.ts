import io, { Socket } from "socket.io-client";

export const _socket = io("http://localhost:3000");

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  _socket.on("connection", (socket: Socket) => {
    callback(socket.id);
  });
};

export const unsubscribeFromConnection = () => {
  _socket.off("connection");
};
