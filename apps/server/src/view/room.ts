import { HydratedDocument } from "mongoose";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer, IRoom } from "types/src/Room";
import { IRawPlayer, IRawRoom } from "../models/room";

export const toIdView = (doc: HydratedDocument<unknown>): IExternalEvent<{ id: string }> => {
  return { payload: { id: doc._id.toHexString() } };
};

export const toRoomView = (room: HydratedDocument<IRawRoom>): IExternalEvent<IRoom> => {
  const { _id, createdAt, name, playlist, selected, settings, player, users } = room;
  return {
    payload: {
      chatHistory: [],
      createdAt: +createdAt,
      name,
      playlist,
      selected,
      settings,
      player,
      users,
      id: _id.toHexString(),
    },
  };
};

export const toRoomsView = (rooms: HydratedDocument<IRawRoom>[]): IExternalEvent<IRoom[]> => {
  return {
    payload: rooms.map(({ _id, createdAt, name, playlist, selected, settings, player, users }) => ({
      chatHistory: [],
      createdAt: +createdAt,
      name,
      playlist,
      selected,
      settings,
      player,
      users,
      id: _id.toHexString(),
    })),
  };
};

export const toPlaylistView = (room: HydratedDocument<{ playlist: string[] }>): IExternalEvent<string[]> => {
  return { payload: room.playlist };
};

export const toSelectedSource = (room: HydratedDocument<{ selected: string }>): IExternalEvent<string> => {
  return { payload: room.selected };
};

export const toPlayerView = (room: HydratedDocument<{ player: IRawPlayer }>): IExternalEvent<IPlayer> => {
  return { payload: room.player };
};
