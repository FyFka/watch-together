import { ObjectId } from "mongodb";
import { IRoomRaw } from "../../shared/Room";
import database from "../database";

export const handleAddPlaylist = async (source: string, roomId: string) => {
  try {
    const room = await database
      .collection<IRoomRaw>("rooms")
      .findOneAndUpdate({ _id: new ObjectId(roomId) }, { $push: { playlist: source } });
    if (!room) {
      return { message: "Room not found" };
    }

    return { payload: room };
  } catch (err) {
    return { message: "Room not found[2]" };
  }
};
