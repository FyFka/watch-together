import { HydratedDocument } from "mongoose";
import { IExternalEvent } from "types/src/ExternalEvent";
import { IPlayer, IRoom } from "types/src/Room";
import { IRawPlayer, IRawRoom } from "../models/room";

export const toIdView = (doc: HydratedDocument<unknown>): IExternalEvent<{ id: string }> => {
  return { payload: { id: doc._id.toHexString() } };
};

export const toRoomView = (room: HydratedDocument<IRawRoom>): IExternalEvent<IRoom> => {
  const { _id, createdAt, name, sources, selectedSource, settings, player, users } = room;
  return {
    payload: {
      chatHistory: [],
      createdAt: +createdAt,
      name,
      sources,
      selectedSource,
      settings,
      player,
      users,
      id: _id.toHexString(),
    },
  };
};

export const toRoomsView = (rooms: HydratedDocument<IRawRoom>[]): IExternalEvent<IRoom[]> => {
  return {
    payload: rooms.map(({ _id, createdAt, name, sources, selectedSource, settings, player, users }) => ({
      chatHistory: [],
      createdAt: +createdAt,
      name,
      sources,
      selectedSource,
      settings,
      player,
      users,
      id: _id.toHexString(),
    })),
  };
};

export const toSourcesView = (room: HydratedDocument<{ sources: string[] }>): IExternalEvent<string[]> => {
  return { payload: room.sources };
};

export const toSelectedSource = (room: HydratedDocument<{ selectedSource: string }>): IExternalEvent<string> => {
  return { payload: room.selectedSource };
};

export const toPlayerView = (room: HydratedDocument<{ player: IRawPlayer }>): IExternalEvent<IPlayer> => {
  return { payload: room.player };
};
