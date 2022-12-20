import { MongoClient, MongoClientOptions } from "mongodb";

const initDatabase = (options?: MongoClientOptions) => {
  if (!process.env.DATABASE_URI) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URI"');
  }

  const uri = process.env.DATABASE_URI;
  const client = new MongoClient(uri, options);
  client.connect();
  const database = client.db("watch-together");
  return database;
};

export default initDatabase();
