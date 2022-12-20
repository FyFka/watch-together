import database from "../database";

export const handleCreateRoom = async () => {
  try {
    const result = await database
      .collection("rooms")
      .insertOne({ createdAt: new Date(), playlist: [], selected: "", settings: {}, chatHistory: [] });
    return { payload: { id: result.insertedId } };
  } catch (err) {
    return { message: "Something bad happened. The room has not been created" };
  }
};
