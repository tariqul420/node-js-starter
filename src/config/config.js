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
    uri: `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@tariqul-islam.mkjrj.mongodb.net/?retryWrites=true&w=majority&appName=TARIQUL-ISLAM`,
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
  },
  cookie: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    tokenName: 'token',
  },
};

export default config;
