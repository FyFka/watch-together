import { Socket } from "socket.io";
import { handleCreateRoom, handleDisconnect, handleJoinRoom, handleLeaveRoom, handleRooms } from "../handlers/room";

const registerRoomEvents = (socket: Socket) => {
  socket.on("room::send:create", async () => {
    socket.emit("room::get:create", await handleCreateRoom(socket));
  });
  socket.on("room::send:join", async (roomId: string) => {
    socket.emit("room::get:join", await handleJoinRoom(socket, roomId));
  });
  socket.on("room::send:rooms", async () => {
    socket.emit("room::get:rooms", await handleRooms(socket));
  });
  socket.on("room::send:leave", async (roomId: string) => {
    await handleLeaveRoom(socket, roomId);
  });
  socket.on("disconnect", async () => {
    await handleDisconnect(socket);
  });
};

export default registerRoomEvents;
