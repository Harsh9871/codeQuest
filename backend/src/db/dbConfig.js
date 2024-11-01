import mongoose from 'mongoose';
import { mongoURI } from '../config/dotenvConfig.js';

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    .catch(err => console.error('MongoDB connection error:', err))
    .then(() => {
      console.log('MongoDB connected');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;