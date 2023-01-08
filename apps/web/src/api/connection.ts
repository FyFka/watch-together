import io, { Socket } from "socket.io-client";
import { getFromLocalStorage } from "../utils/localStorage";

const connect = (token: string | null) => {
  return io(process.env.PREACT_DEV_API_URL || "", { auth: { token } });
};

export const socket = connect(getFromLocalStorage<string>("token"));

export const subscribeToConnection = (callback: (connectionId: string) => void) => {
  const onConnect = () => callback(socket.id);
  const onDisconnect = () => callback("");
  const onReconnect = (socket: Socket) => callback(socket.id);

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("reconnect", onReconnect);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("reconnect", onReconnect);
  };
};

export const reconnect = (token: string | null) => {
  socket.disconnect();
  socket.auth = { token };
  socket.connect();
};
