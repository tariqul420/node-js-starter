import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config.js';

// Check if MongoDB URI exists
if (!config.mongodb.uri) {
  console.error(
    'MongoDB URI is not defined. Please check your environment variables.',
  );
  process.exit(1);
}

const uri = config.mongodb.uri.replace(
  '<db_password>',
  config.mongodb.password,
);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
