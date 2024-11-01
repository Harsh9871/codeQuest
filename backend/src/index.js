import express from "express";
import { port } from './config/dotenvConfig.js';
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

import userRouter from './routes/userRoutes.js';
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
