import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';

let db;
let client;

export const dbConnect = async () => {
  try {
    client = new MongoClient(config.mongodb.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log('☘️  You successfully connected to MongoDB!');
    db = client.db('DatabaseName'); // Replace with your actual database name
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const getDbConnect = () => {
  if (!db) {
    throw new Error('Database not initialized. Call dbConnect first');
  }
  return db;
};

export const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
