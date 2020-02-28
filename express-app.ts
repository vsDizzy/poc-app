import * as express from 'express';
import * as bodyParser from 'body-parser';
import { groupRouter } from './routers/group.router';
import { roleMiddleware } from './middlewares/role.middleware';
import { Role } from './schemas/role.schema';
import { jwtMiddleware } from './middlewares/jwt.middleware';
import { userMiddleware } from './middlewares/user.middleware';

export const app = express();

app.use(bodyParser.json());
app.use(jwtMiddleware, userMiddleware);
app.use(roleMiddleware(Role.globalManager));
app.set('json spaces', 2);

app.use('/', groupRouter);
