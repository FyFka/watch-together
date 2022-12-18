import io, { Socket } from "socket.io-client";

export const _socket = io({
  auth: {
    token: "__TOKEN-TOKEN-TOKEN-TOKEN__",
  },
});

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  _socket.on("connection", (socket: Socket) => {
    callback(socket.id);
  });
};

export const unsubscribeFromConnection = () => {
  _socket.off("connection");
};
