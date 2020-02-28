import * as express from 'express';
import userApi from '../db/user.api';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../schemas/role.schema';
import { GroupSchema } from '../schemas/group.schema';

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
  if (userApi.getRoleForGroup(user, null) == Role.globalManager) {
    const { email, role }: RoleDto = req.body;
    const id = userApi.addRole(email, role, null);
    res.json({ id });
  }
});

userRouter.put('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userApi.update(id, user);
  res.end();
});

userRouter.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  userApi.delete(id);
  res.end();
});
