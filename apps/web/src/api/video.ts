import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer } from "types/src/Room";
import { socket } from "./connection";

export const addToPlaylist = (source: string, roomId: string) => {
  socket.emit("video::send:playlist-add", source, roomId);
};

export const subscribeToPlaylist = (callback: (extEvt: IExternalEvent<string[]>) => void) => {
  socket.on("video::get:playlist", callback);

  return () => {
    socket.off("video::get:playlist", callback);
  };
};

export const selectSource = (selectedVideo: string, roomId: string) => {
  socket.emit("video::send:select-source", selectedVideo, roomId);
};

export const subscribeToSelectSource = (callback: (extEvt: IExternalEvent<string>) => void) => {
  socket.on("video::get:select-source", callback);

  return () => {
    socket.off("video::get:select-source", callback);
  };
};

export const playVideo = (seconds: number, roomId: string) => {
  socket.emit("video::send:play", seconds, roomId);
};

export const subscribeToPlay = (callback: (extEvt: IExternalEvent<IPlayer>) => void) => {
  socket.on("video::get:play", callback);

  return () => {
    socket.off("video::get:play", callback);
  };
};

export const pauseVideo = (seconds: number, roomId: string) => {
  socket.emit("video::send:pause", seconds, roomId);
};

export const subscribeToPause = (callback: (extEvt: IExternalEvent<IPlayer>) => void) => {
  socket.on("video::get:pause", callback);

  return () => {
    socket.off("video::get:pause", callback);
  };
};

export const seekVideo = (seconds: number, isPlaying: boolean, roomId: string) => {
  socket.emit("video::send:seek", seconds, isPlaying, roomId);
};

export const subscribeToSeek = (callback: (extEvt: IExternalEvent<IPlayer>) => void) => {
  socket.on("video::get:seek", callback);

  return () => {
    socket.off("video::get:seek", callback);
  };
};

export const deleteSource = (source: string, roomId: string) => {
  socket.emit("video::send:delete-source", source, roomId);
};

export const subscribeToDeleteSource = (callback: (extEvt: IExternalEvent<string[]>) => void) => {
  socket.on("video::get:delete-source", callback);

  return () => {
    socket.off("video::get:delete-source", callback);
  };
};
