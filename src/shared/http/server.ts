import 'dotenv/config';
import 'reflect-metadata';
import express, { Request } from 'express';
import cors from 'cors';
import { Response } from 'express-serve-static-core';

/* Its necessary to DB Running */
import '@shared/typeorm';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.json('Ok');
});

const port = process.env.APP_PORT;
/* teste */
const teste = process.env.APP_TESTE;

app.listen(port, () => {
  console.log('Server Running!', port);
});
