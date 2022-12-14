import Room from "../models/room";
import { toErrorView } from "../view/common";
import { toPlayerView, toSourcesView, toSelectedSource } from "../view/room";

export const handleAddPlaylist = async (source: string, roomId: string) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, { $push: { sources: source } }, { new: true });
    if (!updatedRoom) return toErrorView("Room doesn't exists");
    return toSourcesView(updatedRoom);
  } catch (err) {
    return toErrorView("The playlist has not been added. Try again later.");
  }
};

export const handleSelectSource = async (selectedSource: string, roomId: string) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, { $set: { selectedSource } }, { new: true });
    if (!updatedRoom) return toErrorView("Room doesn't exists");
    return toSelectedSource(updatedRoom);
  } catch (err) {
    return toErrorView("The selection has not been changed. Try again later.");
  }
};

export const handleDeleteSource = async (source: string, roomId: string) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, { $pull: { sources: source } }, { new: true });
    if (!updatedRoom) return toErrorView("Room doesn't exists");
    return toSourcesView(updatedRoom);
  } catch (err) {
    return toErrorView("The source has not been deleted. Try again later.");
  }
};

export const handleAction = async (seconds: number, isPlaying: boolean, roomId: string) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: { "player.seconds": seconds, "player.isPlaying": isPlaying } },
      { new: true }
    );
    if (!updatedRoom) return toErrorView("Room doesn't exists");
    return toPlayerView(updatedRoom);
  } catch (err) {
    return toErrorView("The video has not been played. Try again later.");
  }
};
