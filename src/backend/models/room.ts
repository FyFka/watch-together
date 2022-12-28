import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  playlist: [{ type: String, required: true }],
  selected: { type: String },
  settings: { type: String },
  chatHistory: [{ type: String, required: true }],
  users: {
    online: [{ type: String, required: true }],
    members: [{ type: String, required: true }],
    owner: { type: String, required: true },
  },
});

const Room = model("Room", RoomSchema);
export default Room;
