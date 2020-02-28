import * as express from 'express';
import userApi from '../db/user.api';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../schemas/role.schema';

export const userRouter = express.Router({ mergeParams: true });
userRouter.use(roleMiddleware(Role.manager));

userRouter.get('/', roleMiddleware(Role.regular), requireAuth, (req, res) => {
  const { groupId } = req.params;
  const users = userApi.getUsersForGroup(groupId);
  res.json({ users });
});

interface RoleDto {
  email: string;
  role: Role;
}

userRouter.post('/', requireAuth, (req, res) => {
  const groupId = req.params['groupId'] || null;

  const user = req['user'];
  const { email, role }: RoleDto = req.body;
  if (userApi.getRoleForGroup(user, null) == Role.globalManager) {
    const id = userApi.addRole(email, role, groupId);
    return res.json({ id });
  }

  if (userApi.getRoleForGroup(user, groupId) == Role.manager) {
    if ([Role.manager, Role.regular].some(x => x == role)) {
      const id = userApi.addRole(email, role, groupId);
      return res.json({ id });
    }
  }

  res.status(403).json({ error: 'Forbidden.' });
});

userRouter.delete('/:id', requireAuth, (req, res) => {
  const groupId = req.params['groupId'] || null;

  const user = req['user'];
  const { email, role }: RoleDto = req.body;
  if (userApi.getRoleForGroup(user, null) == Role.globalManager) {
    const id = userApi.removeRole(email, role, groupId);
    return res.json({ id });
  }

  if (userApi.getRoleForGroup(user, groupId) == Role.manager) {
    if ([Role.manager, Role.regular].some(x => x == role)) {
      const id = userApi.removeRole(email, role, groupId);
      if (id) {
        return res.json({ id });
      }

      return res.status(404).json({ error: 'Role not found.' });
    }
  }

  res.status(403).json({ error: 'Forbidden.' });
});
