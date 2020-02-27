import * as express from 'express';
import { Role } from '../schemas/role.schema';
import userApi from '../db/user.api';

export function roleMiddleware(role: Role) {
  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req['isAuthorized']) {
      return next();
    }

    const user = req['user'];
    const groupId =
      role == Role.globalManager ? null : req.params.groupId || null;
    if (userApi.getRoleForGroup(user, groupId) == role) {
      req['isAuthorized'] = true;
    }
    next();
  };
}
