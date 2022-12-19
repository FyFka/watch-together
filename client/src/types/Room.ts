export interface IRoom {
  id: string;
  createdAt: number;
  playlist: string[];
  selected: string;
  chatHistory: IMessage[];
  settings: null;
}

export interface IRoomRaw extends Omit<IRoom, "id" | "createdAt"> {
  _id: string;
  createdAt: Date;
}

export interface IMessage {
  sentAt: number;
  message: string;
  username: string;
  avatar: string;
}
