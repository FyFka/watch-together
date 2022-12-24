import { IResponse } from "../../shared/Response";
import { socket } from "./connection";

export const addToPlaylist = (source: string, roomId: string) => {
  socket.emit("video::send:playlist-add", source, roomId);
};

export const subscribeToPlaylist = (callback: (res: IResponse<string[]>) => void) => {
  socket.on("video::get:playlist", callback);
};

export const unsubscribeFromPlaylist = () => {
  socket.off("video::get:playlist");
};

export const selectVideo = (source: string) => {
  socket.emit("video::send:select", source);
};

export const subscribeToSelect = (callback: (res: IResponse<string>) => void) => {
  socket.on("video::get:select", callback);
};

export const unsubscribeFromSelect = () => {
  socket.off("video::get:select");
};
