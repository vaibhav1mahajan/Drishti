import mongoose from 'mongoose';

export async function connectMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/drishti';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('[mongo] connected');
}
