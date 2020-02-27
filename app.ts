import * as express from 'express';
import * as bodyParser from 'body-parser';
import { app as config } from './package.json';
import { userRouter } from './routers/user.router';
import { jwtMiddleware } from './jwt';
import { groupRouter } from './routers/group.router';

export const app = express();

app.use(jwtMiddleware, bodyParser.json());
app.set('json spaces', 2);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(config.port);
