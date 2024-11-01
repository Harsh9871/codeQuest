import express from "express";
import { port } from './config/dotenvConfig.js';

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
