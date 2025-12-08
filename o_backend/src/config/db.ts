// import mongoose from 'mongoose';
// import logger from '../utils/logger';

// export async function connectDB(mongoUri: string) {
//   try {
//     await mongoose.connect(mongoUri);
//     logger.info('Connected to MongoDB');
//   } catch (err) {
//     logger.error('MongoDB connection error', err);
//     process.exit(1);
//   }
// }


import mongoose from 'mongoose';
import logger from '../utils/logger';

export async function connectDB(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri);
    logger.info('✔ Connected to MongoDB Atlas');
  } catch (err) {
    logger.error('❌ MongoDB connection error:');
    logger.error(err);
    process.exit(1);
  }
}
