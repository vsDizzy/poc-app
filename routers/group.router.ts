import * as express from 'express';
import groupApi from '../db/group.api';
import { collectionRouter } from './collection.router';

export const groupRouter = express.Router();
groupRouter.use('/:groupId', collectionRouter);

groupRouter.get('/', (_req, res) => {
  const groups = groupApi.get();
  return res.json(groups);
});

groupRouter.post('/', (req, res) => {
  const { name } = req.body;
  const id = groupApi.create(name);
  return res.json({ id });
});

groupRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  groupApi.update(id, name);
  return res.end();
});

groupRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  groupApi.delete(id);
  return res.end();
});
