// import dotenv from 'dotenv';
// dotenv.config();
// import app from './app';
// import { connectDB } from './config/db';
// import logger from './utils/logger';

// const PORT = process.env.PORT || 4000;

// (async () => {
//   await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/orsa');
//   app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
// })();


import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import logger from './utils/logger';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup failed");
    console.error(err);
  }
})();
