import { IResponse } from "../../shared/Response";
import { socket } from "./connection";

export const addToPlaylist = (source: string, roomId: string) => {
  socket.emit("video::send:playlist-add", source, roomId);
};

export const subscribeToPlaylist = (callback: (res: IResponse<string[]>) => void) => {
  socket.on("video::get:playlist", callback);

  return () => {
    socket.off("video::get:playlist", callback);
  };
};

export const selectVideo = (selectedVideo: string, roomId: string) => {
  socket.emit("video::send:select-video", selectedVideo, roomId);
};

export const subscribeToSelect = (callback: (res: IResponse<string>) => void) => {
  socket.on("video::get:select-video", callback);

  return () => {
    socket.off("video::get:select-video", callback);
  };
};

export const playVideo = (seconds: number, roomId: string) => {
  socket.emit("video::send:play", roomId);
};

export const subscribeToPlay = (callback: (res: IResponse<string>) => void) => {
  socket.on("video::get:play", callback);

  return () => {
    socket.off("video::get:play", callback);
  };
};

export const pauseVideo = (seconds: number, roomId: string) => {
  socket.emit("video::send:pause", roomId);
};

export const subscribeToPause = (callback: (res: IResponse<string>) => void) => {
  socket.on("video::get:pause", callback);

  return () => {
    socket.off("video::get:pause", callback);
  };
};
