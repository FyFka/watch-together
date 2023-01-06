import { IExternalEvent } from "types/src/ExternalEvent";
import { IRoom } from "types/src/Room";
import { socket } from "./connection";

export const createRoom = () => {
  socket.emit("room::send:create");
};

export const subscribeToCreatedRoom = (callback: (extEvt: IExternalEvent<{ id: string }>) => void) => {
  socket.on("room::get:create", callback);

  return () => {
    socket.off("room::get:create", callback);
  };
};

export const joinRoom = (roomId: string) => {
  socket.emit("room::send:join", roomId);
};

export const subscribeToJoinRoom = (callback: (extEvt: IExternalEvent<IRoom>) => void) => {
  socket.on("room::get:join", callback);

  return () => {
    socket.off("room::get:join", callback);
  };
};

export const leaveRoom = (roomId: string) => {
  socket.emit("room::send:leave", roomId);
};

export const getLastRooms = () => {
  socket.emit("room::send:last-rooms");
};

export const subscribeToLastRooms = (callback: (extEvt: IExternalEvent<IRoom[]>) => void) => {
  socket.on("room::get:last-rooms", callback);

  return () => {
    socket.off("room::get:last-rooms", callback);
  };
};
