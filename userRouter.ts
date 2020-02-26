import * as express from 'express';
import userApi from './db/userApi';

export const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  const users = userApi.get();
  res.json(users);
});

userRouter.post('/', (req, res, next) => {
  const id = userApi.create(req.body);
  res.json(id);
});

userRouter.put('/:id', (req, res, next) => {
  const { id } = req.params;
  userApi.update(id, req.body);
  res.end();
});

userRouter.delete('/:id', (req, res, next) => {
  userApi.delete(req.params.id);
  res.end();
});
