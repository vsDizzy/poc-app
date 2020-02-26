import * as express from 'express';
import * as bodyParser from 'body-parser';
import { app as config } from './package.json';
import { userRouter } from './userRouter';
import { jwtMiddleware } from './jwt';

export const app = express();

app.use(jwtMiddleware, bodyParser.json());
app.set('json spaces', 2);

app.use('/users', userRouter);

app.listen(config.port);
