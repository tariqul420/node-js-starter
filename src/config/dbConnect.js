import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';

let db;
let client;

const uri = config.mongodb.uri;

export const dbConnect = async () => {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db('DatabaseName');
    console.log('☘️  You successfully connected to MongoDB!');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first');
  }
  return db;
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
