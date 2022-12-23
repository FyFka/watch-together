import { Socket } from "socket.io";
import { handleCreateRoom, handleJoinRoom } from "../handlers/room";

const registerRoomEvents = (socket: Socket) => {
  socket.on("room::send:create", async () => {
    socket.emit("room::get:create", await handleCreateRoom());
  });
  socket.on("room::send:join", async (roomId: string) => {
    socket.emit("room::get:join", await handleJoinRoom(roomId));
  });
};

export default registerRoomEvents;
