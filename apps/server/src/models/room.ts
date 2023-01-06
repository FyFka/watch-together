import { Schema, model } from "mongoose";

export interface IRawRoom {
  createdAt: number;
  name: string;
  sources: string[];
  selectedSource: string;
  settings: string;
  chatHistory: string[];
  player: IRawPlayer;
  users: {
    online: string[];
    members: string[];
    owner: string;
  };
}

export interface IRawPlayer {
  seconds: number;
  isPlaying: boolean;
}

const RoomSchema = new Schema<IRawRoom>({
  createdAt: { type: Number, required: true },
  name: { type: String, required: true },
  sources: [{ type: String, required: true }],
  selectedSource: { type: String },
  settings: { type: String },
  chatHistory: [{ type: String, required: true }],
  player: {
    seconds: { type: Number, required: true },
    isPlaying: { type: Boolean, required: true },
  },
  users: {
    online: [{ type: String, required: true }],
    members: [{ type: String, required: true }],
    owner: { type: String, required: true },
  },
});

const Room = model<IRawRoom>("Room", RoomSchema);
export default Room;
