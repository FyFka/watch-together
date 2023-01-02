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

export const selectVideo = (selectedVideo: string, roomId: string) => {
  socket.emit("video::send:select-video", selectedVideo, roomId);
};

export const subscribeToSelect = (callback: (extEvt: IExternalEvent<string>) => void) => {
  socket.on("video::get:select-video", callback);

  return () => {
    socket.off("video::get:select-video", callback);
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
