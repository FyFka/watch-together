import { Socket } from "socket.io";
import { IResponse } from "../../shared/Response";
import Room from "../models/room";
import { generateRoom } from "../utils/generate";

export const handleCreateRoom = async (socket: Socket): Promise<IResponse<{ id: string }>> => {
  try {
    const { _id } = await Room.create(generateRoom(socket.account.id));
    return { payload: { id: _id.toHexString() } };
  } catch (err) {
    return { message: "The room has not been created. Try again later." };
  }
};

export const handleJoinRoom = async (socket: Socket, roomId: string) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return { message: "Room doesn't exists" };
    }
    await room.updateOne({ $addToSet: { "users.online": socket.account.id, "users.members": socket.account.id } });
    socket.join(roomId);
    const { _id, chatHistory, createdAt, name, playlist, selected, settings } = room;
    return { payload: { chatHistory, createdAt, name, playlist, selected, settings, id: _id } };
  } catch (err) {
    return { message: "The room has not been joined. Try again later." };
  }
};

export const handleDisconnect = async (socket: Socket) => {
  try {
    const rooms = await Room.find({ "users.online": socket.account.id });
    if (!rooms.length) {
      return;
    }
    for (const room of rooms) {
      await room.updateOne({ $pull: { "users.online": socket.account.id } });
    }
  } catch (_) {}
};

export const handleLeaveRoom = async (socket: Socket, roomId: string) => {
  try {
    const room = await Room.findById({ _id: roomId });
    if (!room) {
      return;
    }
    await room.updateOne({ $pull: { "users.online": socket.account.id } });
  } catch (_) {}
};
