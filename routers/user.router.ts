import * as express from 'express';
import userApi from '../db/user.api';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../schemas/role.schema';

export const userRouter = express.Router();
userRouter.use(roleMiddleware(Role.manager));

userRouter.get('/', roleMiddleware(Role.regular), requireAuth, (_req, res) => {
  const users = userApi.get();
  res.json(users);
});

userRouter.post('/', requireAuth, (req, res) => {
  const user = req.body;
  const id = userApi.create(user);
  res.json({ id });
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
