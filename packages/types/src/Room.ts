export interface IRoom {
  id: string;
  createdAt: number;
  name: string;
  sources: string[];
  selectedSource: string;
  chatHistory: IMessage[];
  settings: string;
  player: IPlayer;
  users: IUsers;
}

export interface IPlayer {
  seconds: number;
  isPlaying: boolean;
}

export interface IUsers {
  online: string[];
  members: string[];
  owner: string;
}

export interface IMessage {
  sentAt: number;
  message: string;
  username: string;
  avatar: string;
}
