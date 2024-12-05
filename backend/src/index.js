import express from "express";
import { port } from './config/dotenvConfig.js';
import path from 'path';

import connectDB from './db/dbConfig.js';
connectDB();
const app = express();
import cors from "cors";
app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

import { userRouter } from './routes/userRoutes.js';
app.use('/user', userRouter);

const __dirname = path.resolve();
const imagesPath = path.join(__dirname, './src/asset/images');

// Serve files in './asset/images' under '/asset/images' route
app.use('/asset/images', express.static(imagesPath));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
