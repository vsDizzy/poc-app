import * as jwt from 'jsonwebtoken';
import { app as config } from './package.json';
import { Role } from './schemas/role.schema';
import * as express from 'express';

export function getToken(role: Role): string {
  return jwt.sign({ role }, config.secret);
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

      req['role'] = data['role'];
      return next();
    });
  }

  req['role'] = Role.regular;
  next();
}
