import { ObjectId } from "mongodb";
import { Socket } from "socket.io";
import { IResponse } from "../../shared/Response";
import database from "../database";

export const handleCreateRoom = async (): Promise<IResponse<{ id: string }>> => {
  try {
    const result = await database.collection("rooms").insertOne({
      createdAt: new Date(),
      playlist: [],
      selected: "",
      settings: {},
      chatHistory: [],
      users: [],
    });
    return { payload: { id: result.insertedId.toHexString() } };
  } catch (err) {
    return { message: "Something bad happened. The room has not been created" };
  }
};

export const handleJoinRoom = async (socket: Socket, roomId: string) => {
  try {
    const room = await database.collection("rooms").findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      return { message: "Room not found" };
    }
    socket.join(roomId);
    const { _id, ...rest } = room;
    return { payload: { ...rest, id: _id } };
  } catch (err) {
    return { message: "Room not found[2]" };
  }
};
