import * as express from 'express';
import userApi from '../db/user.api';
import { jwtMiddleware } from './jwt.middleware';

export const userMiddleware = [
  jwtMiddleware,
  function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const jwt = req['jwt'];
    const email = jwt && jwt.email;
    if (email) {
      const user = userApi.findUser(email);
      if (user) {
        req['user'] = user;
      }
      return next();
    }

    res.status(401).json({ error: 'Unauthorized.' });
  }
];
