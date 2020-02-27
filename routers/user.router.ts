import * as express from 'express';
import userApi from '../db/user.api';

export const userRouter = express.Router();

userRouter.get('/', (_req, res) => {
  const users = userApi.get();
  res.json(users);
});

userRouter.post('/', (req, res) => {
  const user = req.body;
  const id = userApi.create(user);
  res.json({ id });
});

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userApi.update(id, user);
  res.end();
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  userApi.delete(id);
  res.end();
});
