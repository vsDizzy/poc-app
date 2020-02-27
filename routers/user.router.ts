import * as express from 'express';
import userApi from '../db/user.api';

export const userRouter = express.Router();

userRouter.get('/', (_req, res) => {
  const users = userApi.get();
  res.json(users);
});

userRouter.post('/', (req, res) => {
  const id = userApi.create(req.body);
  res.json({ id });
});

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  userApi.update(id, req.body);
  res.end();
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  userApi.delete(id);
  res.end();
});
