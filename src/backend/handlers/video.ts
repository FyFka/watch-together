import Room from "../models/room";

export const handleAddPlaylist = async (source: string, roomId: string) => {
  try {
    const room = await Room.findByIdAndUpdate(roomId, { $push: { playlist: source } }, { new: true });
    if (!room) {
      return { message: "Room doesn't exists" };
    }
    return { payload: room.playlist };
  } catch (err) {
    return { message: "The playlist has not been added. Try again later." };
  }
};

export const handleSelection = async (selected: string, roomId: string) => {
  try {
    const room = await Room.findByIdAndUpdate(roomId, { $set: { selected } }, { new: true });
    if (!room) {
      return { message: "Room doesn't exists" };
    }
    return { payload: room.selected };
  } catch (err) {
    return { message: "The selection has not been changed. Try again later." };
  }
};

export const handleAction = async (seconds: number, roomId: string, isPlaying: boolean) => {
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      { $set: { "player.seconds": seconds, "player.isPlaying": isPlaying } },
      { new: true }
    );
    if (!room) {
      return { message: "Room doesn't exists" };
    }
    return { payload: room.player };
  } catch (err) {
    return { message: "The video has not been played. Try again later." };
  }
};
