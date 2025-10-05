import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectMongo(): Promise<void> {
  const uri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017';
  const name = process.env.MONGO_DB ?? 'drishti';
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(name);
  console.log('[mongo] connected:', name);
}

export function getDb(): Db {
  if (!db) throw new Error('Mongo not connected');
  return db;
}
