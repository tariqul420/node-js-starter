import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
  mongodb: {
    uri: process.env.MONGODB_DATABASE_URL?.replace(
      '<db_password>',
      process.env.DATABASE_PASSWORD,
    ),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
  },
  cookie: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    tokenName: 'token',
  },
};

export default config;
