import { Socket } from "socket.io";
import Room from "../models/room";
import { generateRoom } from "../utils/generate";
import { toErrorView } from "../view/error";
import { toIdView, toRoomsView, toRoomView } from "../view/room";

export const handleCreateRoom = async (socket: Socket) => {
  try {
    const createdRoom = await Room.create(generateRoom(socket.account.id));
    return toIdView(createdRoom);
  } catch (_) {
    return toErrorView("The room has not been created. Try again later.");
  }
};

export const handleJoinRoom = async (socket: Socket, roomId: string) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) return toErrorView("Room doesn't exists");
    await room.updateOne(
      { $addToSet: { "users.online": socket.account.id, "users.members": socket.account.id } },
      { new: true }
    );
    socket.join(roomId);
    return toRoomView(room);
  } catch (err) {
    return toErrorView("The room has not been joined. Try again later.");
  }
};

export const handleLastRooms = async (socket: Socket) => {
  try {
    const lastRooms = await Room.find({ "users.members": socket.account.id });
    return toRoomsView(lastRooms);
  } catch (err) {
    return toErrorView("The rooms have not been loaded. Try again later.");
  }
};

export const handleDisconnect = async (socket: Socket) => {
  try {
    await Room.updateMany({ "users.online": socket.account.id }, { $pull: { "users.online": socket.account.id } });
  } catch (_) {
    /* empty */
  }
};

export const handleLeaveRoom = async (socket: Socket, roomId: string) => {
  try {
    const room = await Room.findById({ _id: roomId });
    if (!room) return;
    await room.updateOne({ $pull: { "users.online": socket.account.id } });
  } catch (_) {
    /* empty */
  }
};
