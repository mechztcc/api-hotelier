import 'dotenv/config';
import 'reflect-metadata';
import express, { Request } from 'express';
import cors from 'cors';
import { Response } from 'express-serve-static-core';

/* Its necessary to DB Running */
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json('Ok');
});

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log('Server Running!', port);
});
