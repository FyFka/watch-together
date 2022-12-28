import { adjectives, animals, uniqueNamesGenerator } from "unique-names-generator";

export const generateAccount = () => {
  return {
    username: uniqueNamesGenerator({ dictionaries: [adjectives, animals] }),
    createdAt: new Date(),
    password: (Math.random() + 1).toString(36),
  };
};

export const generateRoom = (ownerId: string) => {
  return {
    createdAt: Date.now(),
    name: uniqueNamesGenerator({ dictionaries: [animals] }),
    playlist: [],
    selected: "",
    settings: "",
    chatHistory: [],
    users: {
      online: [],
      members: [ownerId],
      owner: ownerId,
    },
  };
};
