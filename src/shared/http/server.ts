import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

/* Its necessary to DB Running */
import '@shared/typeorm';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      console.log(error);
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log('Server Running!', port);
});
