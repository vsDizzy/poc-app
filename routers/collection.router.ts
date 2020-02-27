import * as express from 'express';
import collectionApi from '../db/collection.api';
import { itemRouter } from './item.router';

export const collectionRouter = express.Router({ mergeParams: true });
collectionRouter.use('/:collectionId', itemRouter);

collectionRouter.get('/', (_req, res) => {
  const collections = collectionApi.get();
  return res.json(collections);
});

collectionRouter.post('/', (req, res) => {
  const { name } = req.body;
  const id = collectionApi.create(name);
  return res.json({ id });
});

collectionRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  collectionApi.update(id, name);
  return res.end();
});

collectionRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  collectionApi.delete(id);
  return res.end();
});
