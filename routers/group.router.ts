import * as express from 'express';
import groupApi from '../db/group.api';
import { collectionRouter } from './collection.router';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { Role } from '../schemas/role.schema';
import { userRouter } from './user.router';

export const groupRouter = express.Router();
groupRouter.use('/:groupId/collections/', collectionRouter);
groupRouter.use('/:groupId?/users/', userRouter);

groupRouter.param('groupId', (req, res, next, id) => {
  try {
    req['group'] = groupApi.get(id);
    next();
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

groupRouter.get('/', roleMiddleware(Role.regular), requireAuth, (_req, res) => {
  const groups = groupApi.getAll();
  return res.json(groups);
});

groupRouter.post('/', requireAuth, (req, res) => {
  const { name } = req.body;
  const id = groupApi.create(name);
  return res.json({ id });
});

groupRouter.put('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  groupApi.update(id, name);
  return res.end();
});

groupRouter.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  groupApi.delete(id);
  return res.end();
});
