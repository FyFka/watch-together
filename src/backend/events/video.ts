import { Server, Socket } from "socket.io";
import { handleAddPlaylist } from "../handlers/video";

const registerVideoEvents = (io: Server, socket: Socket) => {
  socket.on("video::send:playlist-add", async (source: string, roomId: string) => {
    io.in(roomId).emit("video::get:playlist", await handleAddPlaylist(source, roomId));
  });
};

export default registerVideoEvents;
