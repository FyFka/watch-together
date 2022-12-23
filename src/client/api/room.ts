import { IResponse } from "../../shared/Response";
import { IRoom } from "../../shared/Room";
import { socket } from "./connection";

export const createRoom = () => {
  socket.emit("room::send:create");
};

export const subscribeToCreatedRoom = (callback: (res: IResponse<{ id: string }>) => void) => {
  socket.on("room::get:create", callback);
};

export const unsubscribeFromCreatedRoom = () => {
  socket.off("room::get:create");
};

export const subscribeToJoinRoom = (callback: (res: IResponse<IRoom>) => void) => {
  socket.on("room::get:join", callback);
};

export const unsubscribeFromJoinRoom = () => {
  socket.off("room::get:join");
};

export const joinRoom = (roomId: string) => {
  socket.emit("room::send:join", roomId);
};
