import { IResponse } from "../../shared/Response";
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
