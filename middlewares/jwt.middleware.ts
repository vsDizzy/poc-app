import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { app as config } from '../package.json';

export function getToken(data: object): string {
  return jwt.sign(data, config.secret);
}

export function jwtMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const ah = req.headers.authorization;
  const m = /^Bearer (?<token>.*)/.exec(ah);
  if (m && m.groups) {
    const token = m.groups['token'];
    jwt.verify(token, config.secret, (err, data) => {
      if (err) {
        return res.status(401).json({ erorr: err });
      }

      req['jwt'] = data;
      return next();
    });
  }

  next();
}
