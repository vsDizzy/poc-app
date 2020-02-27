import * as express from 'express';
import { Role } from '../schemas/role.schema';
import userApi from '../db/user.api';
import { userMiddleware } from './user.middleware';

export function roleMiddleware(roles: Role | Role[]): unknown {
  return [
    userMiddleware,
    function roleMiddleware(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void {
      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      const user = req['user'];
      const groupId = req['groupId'] || null;

      for (const role of roles) {
        const gid = role == Role.globalManager ? null : groupId;
        if (userApi.getRoleForGroup(user, gid) == role) {
          return next();
        }
      }

      res.status(403).json({ error: 'Forbidden.' });
    }
  ];
}
