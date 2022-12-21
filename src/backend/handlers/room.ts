import { IResponse } from "../../shared/Response";
import database from "../database";

export const handleCreateRoom = async (): Promise<IResponse<{ id: string }>> => {
  try {
    const result = await database
      .collection("rooms")
      .insertOne({ createdAt: new Date(), playlist: [], selected: "", settings: {}, chatHistory: [] });
    return { payload: { id: result.insertedId.toHexString() } };
  } catch (err) {
    return { message: "Something bad happened. The room has not been created" };
  }
};
