import { Schema, model } from "mongoose";

export interface IRawRoom {
  createdAt: Date;
  name: string;
  playlist: string[];
  selected: string;
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
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  playlist: [{ type: String, required: true }],
  selected: { type: String },
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
