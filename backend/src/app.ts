import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errors } from 'celebrate';
import { productRouter, orderRouter } from './routes';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(requestLogger);
app.use('/', productRouter);
app.use('/', orderRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// подключаемся к серверу MongoDB
const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;
mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
