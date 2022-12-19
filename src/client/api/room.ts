import { IResponse } from "../types/Response";
import { _socket } from "./connection";

export const createRoom = () => {
  _socket.emit("room::send:create");
};

export const subscribeToCreatedRoom = (callback: (res: IResponse<{ id: string }>) => void) => {
  _socket.on("room::get::create", callback);
};
