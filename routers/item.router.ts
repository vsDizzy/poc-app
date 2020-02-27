import * as express from 'express';
import itemApi from '../db/item.api';

export const itemRouter = express.Router({ mergeParams: true });

itemRouter.get('/', (_req, res) => {
  const items = itemApi.get();
  return res.json(items);
});

itemRouter.post('/', (req, res) => {
  const { collectionId } = req.params;
  const { name } = req.body;
  const id = itemApi.create(name, collectionId);
  return res.json({ id });
});

itemRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  itemApi.update(id, name);
  return res.end();
});

itemRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  itemApi.delete(id);
  return res.end();
});
