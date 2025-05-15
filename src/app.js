import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from './config/config.js';
import { errorHandler } from './middleware/error.middleware.js';
import jwtRoutes from './routers/jwtRoutes.js';
import userRoutes from './routers/userRoutes.js';

// Express app initialization
const app = express();
app.use(express.json());

app.use(cors(config.cors));
app.use(cookieParser());
app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    status: 'Server is running',
    version: '1.0.0',
    endpoints: {
      users: '/api/user',
      auth: '/api/jwt',
    },
  });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/jwt', jwtRoutes);

// Unhandled Routes
app.all('*', (req, res, next) => {
  try {
    return `Can't Find this URL (${req.originalUrl}) on this server!`;
  } catch (error) {
    next(error);
  }
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
