import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";
import { IAccountRaw } from "../models/account";
import { IRawRoom } from "../models/room";

export const generateAccount = (): IAccountRaw => {
  return {
    username: uniqueNamesGenerator({ dictionaries: [adjectives, animals] }),
    createdAt: Date.now(),
    password: (Math.random() + 1).toString(36),
  };
};

export const generateRoom = (ownerId: string): IRawRoom => {
  return {
    createdAt: Date.now(),
    name: uniqueNamesGenerator({ dictionaries: [animals] }),
    sources: [],
    selectedSource: "",
    settings: "",
    chatHistory: [],
    player: {
      seconds: 0,
      isPlaying: false,
    },
    users: {
      online: [],
      members: [ownerId],
      owner: ownerId,
    },
  };
};
