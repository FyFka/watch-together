import { IRoomRaw } from "../../shared/Room";
import database from "../database";
import Room from "../models/room";

export const handleAddPlaylist = async (source: string, roomId: string) => {
  try {
    const room = await Room.findByIdAndUpdate(roomId, { $push: { playlist: source } }, { new: true });
    if (!room) {
      return { message: "Room not found" };
    }
    return { payload: room.playlist };
  } catch (err) {
    return { message: "Room not found[2]" };
  }
};

export const handleSelection = async (selected: string, roomId: string) => {
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      {
        $set: { selected },
      },
      { new: true }
    );
    if (!room) {
      return { message: "Room not found" };
    }
    return { payload: room.selected };
  } catch (err) {
    return { message: "Room not found[2]" };
  }
};
