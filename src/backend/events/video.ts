import { Server, Socket } from "socket.io";
import { handleAddPlaylist, handleSelection } from "../handlers/video";

const registerVideoEvents = (io: Server, socket: Socket) => {
  socket.on("video::send:playlist-add", async (source: string, roomId: string) => {
    io.in(roomId).emit("video::get:playlist", await handleAddPlaylist(source, roomId));
  });
  socket.on("video::send:select-video", async (selectedVideo: string, roomId: string) => {
    io.in(roomId).emit("video::get:select-video", await handleSelection(selectedVideo, roomId));
  });
};

export default registerVideoEvents;
