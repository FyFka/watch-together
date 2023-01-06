import { Server, Socket } from "socket.io";
import { handleAddPlaylist, handleAction, handleDeleteSource, handleSelectSource } from "../handlers/video";

const registerVideoEvents = (io: Server, socket: Socket) => {
  socket.on("video::send:playlist-add", async (source: string, roomId: string) => {
    io.in(roomId).emit("video::get:playlist", await handleAddPlaylist(source, roomId));
  });
  socket.on("video::send:select-source", async (selectedVideo: string, roomId: string) => {
    io.in(roomId).emit("video::get:select-source", await handleSelectSource(selectedVideo, roomId));
  });
  socket.on("video::send:delete-source", async (source: string, roomId: string) => {
    io.in(roomId).emit("video::get:delete-source", await handleDeleteSource(source, roomId));
  });
  socket.on("video::send:play", async (seconds: number, roomId: string) => {
    io.in(roomId).emit("video::get:play", await handleAction(seconds, true, roomId));
  });
  socket.on("video::send:pause", async (seconds: number, roomId: string) => {
    io.in(roomId).emit("video::get:pause", await handleAction(seconds, false, roomId));
  });
  socket.on("video::send:seek", async (seconds: number, isPlaying: boolean, roomId: string) => {
    io.in(roomId).emit("video::get:seek", await handleAction(seconds, isPlaying, roomId));
  });
};

export default registerVideoEvents;
