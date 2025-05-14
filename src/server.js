import app from './app.js';
import config from './config/config.js';
import { closeConnection, dbConnect } from './config/dbConnect.js';

dbConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`☘️  Server running on port: ${config.port}`);
    });

    process.on('SIGINT', async () => {
      await closeConnection();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await closeConnection();
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
